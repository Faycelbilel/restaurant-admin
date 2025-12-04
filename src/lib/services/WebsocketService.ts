"use client";

import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getGlobalAccessToken } from "@/shared/contexts/AuthContext";

export class WebSocketService {
  private client: Client | null = null;
  private connectionPromise: Promise<void> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isManuallyDisconnected = false;
  private wsUrl: string;
  private tokenCheckInterval: NodeJS.Timeout | null = null;
  private pendingConnection = false;

  constructor(wsUrl?: string) {
    this.wsUrl = wsUrl || process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8086/ws";
  }

  async connect(): Promise<void> {
    if (this.client?.connected) {
      console.log("✅ WebSocket already connected");
      return;
    }

    if (this.connectionPromise) {
      console.log("⏳ Connection in progress, waiting...");
      return this.connectionPromise;
    }

    this.isManuallyDisconnected = false;

    this.connectionPromise = new Promise((resolve, reject) => {
      const attemptConnection = () => {
        const token = getGlobalAccessToken();
        
        if (!token) {
          console.log("⏳ No access token available yet, will retry...");
          
          // Set up token check interval if not already set
          if (!this.tokenCheckInterval && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Retry attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
            
            this.tokenCheckInterval = setTimeout(() => {
              this.tokenCheckInterval = null;
              attemptConnection();
            }, 1000); // Check every second
          } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error("❌ Max reconnection attempts reached without token");
            this.connectionPromise = null;
            reject(new Error("Authentication token not available after multiple retries"));
          }
          return;
        }

        console.log("🔑 Token available, proceeding with connection");
        console.log("🔌 Connecting to WebSocket:", this.wsUrl);
        
        this.client = new Client({
          webSocketFactory: () => new SockJS(this.wsUrl) as WebSocket,
          connectHeaders: {
            Authorization: `Bearer ${token}`,
          },
          debug: (msg) => console.log("[STOMP]", msg),
          reconnectDelay: 5000,
          onConnect: () => {
            console.log("✅ WebSocket connected successfully!");
            this.reconnectAttempts = 0;
            this.connectionPromise = null;
            this.clearTokenCheckInterval();
            resolve();
          },
          onStompError: (frame) => {
            const errorMessage = frame.headers["message"] || "Unknown broker error";
            console.error("❌ STOMP Error:", errorMessage);
            
            this.connectionPromise = null;
            this.clearTokenCheckInterval();
            reject(new Error(errorMessage));
          },
          onWebSocketError: (error) => {
            console.error("❌ WebSocket Error:", error);
            this.connectionPromise = null;
            this.clearTokenCheckInterval();
            
            if (!this.isManuallyDisconnected) {
              reject(error);
            }
          },
          onDisconnect: () => {
            console.log("🔌 WebSocket disconnected");
            this.connectionPromise = null;
            this.clearTokenCheckInterval();
          },
        });

        try {
          console.log("🚀 Activating STOMP client...");
          this.client.activate();
        } catch (error) {
          console.error("❌ Failed to activate client:", error);
          this.connectionPromise = null;
          this.clearTokenCheckInterval();
          reject(error);
        }
      };

      attemptConnection();
    });

    return this.connectionPromise;
  }

  private clearTokenCheckInterval(): void {
    if (this.tokenCheckInterval) {
      clearTimeout(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
  }

  subscribe<T = unknown>(
    topic: string,
    callback: (data: T) => void
  ): () => void {
    console.log("📡 Subscribing to topic:", topic);
    
    if (!this.client?.connected) {
      console.error("❌ Cannot subscribe: client not connected");
      return () => {};
    }

    try {
      const subscription: StompSubscription = this.client.subscribe(
        topic,
        (message: IMessage) => {
          console.log("📨 Message received on topic:", topic);
          try {
            const data: T = JSON.parse(message.body);
            callback(data);
          } catch (error) {
            console.error("❌ Failed to parse message:", error);
          }
        }
      );

      console.log("✅ Subscribed successfully to:", topic);
      
      return () => {
        console.log("🧹 Unsubscribing from:", topic);
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("❌ Failed to subscribe:", error);
      return () => {};
    }
  }

  async disconnect(): Promise<void> {
    console.log("🔌 Disconnecting WebSocket...");
    this.isManuallyDisconnected = true;
    this.clearTokenCheckInterval();
    
    if (this.client?.connected) {
      try {
        await this.client.deactivate();
        console.log("✅ WebSocket disconnected successfully");
      } catch (error) {
        console.error("❌ Error during disconnect:", error);
      }
    }
    
    this.client = null;
    this.connectionPromise = null;
    this.reconnectAttempts = 0;
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}

// Singleton instance
let webSocketInstance: WebSocketService | null = null;

export function getWebSocketService(wsUrl?: string): WebSocketService {
  if (!webSocketInstance) {
    console.log("🆕 Creating new WebSocketService instance");
    webSocketInstance = new WebSocketService(wsUrl);
  }
  return webSocketInstance;
}