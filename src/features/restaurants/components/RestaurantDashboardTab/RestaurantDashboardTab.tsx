"use client";

import Image from "next/image";
import { MapPin, Phone, Star, Info } from "lucide-react";
import { Card, Text } from "@/shared/atoms";
import { TextElement, TextSize, TextWeight, TextColor, CardPadding } from "@/shared/types/enums";
import type { RestaurantDashboardTabProps } from "./types";

export function RestaurantDashboardTab({ restaurant }: RestaurantDashboardTabProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {restaurant.iconUrl ? (
              <Image
                src={restaurant.iconUrl}
                alt={restaurant.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-xl font-semibold text-gray-500">
                {restaurant.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <Text as={TextElement.H2} size={TextSize.Large} weight={TextWeight.Semibold}>
                {restaurant.name}
              </Text>
              <Text as={TextElement.Paragraph} color={TextColor.Muted} className="mt-1">
                {restaurant.description || "No description provided."}
              </Text>
            </div>
          </div>
          {restaurant.rating !== undefined && (
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-yellow-700">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{restaurant.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding={CardPadding.Large} className="lg:col-span-2">
          <Text as={TextElement.H3} size={TextSize.Medium} weight={TextWeight.Semibold}>
            Contact & Location
          </Text>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{restaurant.address || "Address not set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{restaurant.phone || "Phone not set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <span>License: {restaurant.licenseNumber || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <span>Tax ID: {restaurant.taxId || "N/A"}</span>
            </div>
            {restaurant.latitude !== undefined && restaurant.longitude !== undefined && (
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="font-mono">
                  {restaurant.latitude.toFixed(4)}, {restaurant.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </Card>

        <Card padding={CardPadding.Large}>
          <Text as={TextElement.H3} size={TextSize.Medium} weight={TextWeight.Semibold}>
            Status
          </Text>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Manually Closed</span>
              <span className="font-semibold">
                {restaurant.manuallyClosed ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Images</span>
              <span className="font-semibold">
                {restaurant.images ? `${restaurant.images.length} images` : "None"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {restaurant.imageUrl && (
        <Card padding={CardPadding.None} className="overflow-hidden">
          <div className="relative h-72 w-full">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </Card>
      )}
    </div>
  );
}
