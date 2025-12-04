"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  FileText,
  Star,
  LayoutGrid,
  History,
  NotebookPen,
  Wallet,
  Clock3,
} from "lucide-react";
import Image from "next/image";
import { Card, IconButton, StatusBadge, Text, Badge } from "@/shared/atoms";
import { useAuth } from "@/shared/contexts";
import {
  AuthStatus,
  ButtonVariant,
  ButtonSize,
  TextVariant,
  CardPadding,
  TextColor,
  StatusBadgeStatus,
  StatusBadgeSize,
  TextElement,
  TextSize,
  TextWeight,
  BadgeVariant,
} from "@/shared/types/enums";
import { UserRole } from "@/shared/types";

function RestaurantLayoutSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Card padding={CardPadding.Large}>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-48 bg-gray-200 rounded-3xl"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, restaurant, status } = useAuth();

  const restaurantId = useMemo(() => {
    const resolved = user?.restaurantId || restaurant?.id;
    return resolved ? String(resolved) : undefined;
  }, [restaurant?.id, user?.restaurantId]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "history", label: "History", icon: History },
    { id: "menu", label: "Menu", icon: NotebookPen },
    { id: "billing", label: "Billing", icon: Wallet },
    { id: "operating-hours", label: "Operating Hours", icon: Clock3 },
  ] as const;

  const activeTab = useMemo(() => {
    const last = pathname?.split("/").filter(Boolean).pop();
    return last || "dashboard";
  }, [pathname]);

  useEffect(() => {
    // Enforce auth and ensure we only access dashboard if user/restaurant exist
    params.then((resolvedParams) => {
      const targetParamId = resolvedParams.id;
      if (status === AuthStatus.Unauthenticated) {
        router.replace("/login");
        return;
      }
      if (!restaurantId || targetParamId !== restaurantId) {
        // Align URL to authenticated restaurant
        if (restaurantId) {
          router.replace(`/restaurants/${restaurantId}/dashboard`);
        }
      }
    });
  }, [params, restaurantId, router, status]);

  if (status === AuthStatus.Loading) {
    return <RestaurantLayoutSkeleton />;
  }

  if (!restaurant || !restaurantId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-lg text-gray-600">Restaurant not available. Please login again.</p>
        <form action="/login">
          <IconButton type="submit" variant={ButtonVariant.Primary} size={ButtonSize.Medium}>
            <ArrowLeft className="h-5 w-5" />
          </IconButton>
        </form>
      </div>
    );
  }

  const isOpen = !restaurant.manuallyClosed;

  const adminRestaurantId = user?.restaurantId || user?.id || restaurantId;
  const backHref =
    user?.role === UserRole.RestaurantAdmin && adminRestaurantId
      ? `/restaurants/${adminRestaurantId}/dashboard`
      : "/restaurants";

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => router.push(`/restaurants/${restaurantId}/${tab.id}`)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <Card padding={CardPadding.Large}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <form action={backHref}>
                <IconButton
                  type="submit"
                  variant={ButtonVariant.Primary}
                  size={ButtonSize.Medium}
                  aria-label="Back to restaurant selection"
                >
                  <ArrowLeft className="h-5 w-5" />
                </IconButton>
              </form>
              <div>
                <Text
                  variant={TextVariant.Label}
                  color={TextColor.Primary}
                >
                  Restaurant
                </Text>
                <div className="mt-1 inline-flex items-center gap-3">
                  <StatusBadge
                    status={isOpen ? StatusBadgeStatus.Active : StatusBadgeStatus.Inactive}
                    label={isOpen ? "Open" : "Closed"}
                    size={StatusBadgeSize.Small}
                  />
                  <Text 
                    as={TextElement.Span}
                    weight={TextWeight.Semibold}
                    className="text-xs text-gray-500"
                  >
                    Restaurant
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-3xl shadow-lg bg-gray-200">
              {restaurant.imageUrl ? (
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 448px"
                  priority
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Text color={TextColor.Muted}>No image available</Text>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {restaurant.sponsored && (
                <div className="absolute top-3 right-3">
                  <Badge variant={BadgeVariant.Warning}>Sponsored</Badge>
                </div>
              )}
              {restaurant.rating && (
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Text size={TextSize.Small} weight={TextWeight.Semibold}>
                    {restaurant.rating.toFixed(1)}
                  </Text>
                </div>
              )}
            </div>
            <div>
              <Text as={TextElement.H1} size={TextSize.ThreeExtraLarge} weight={TextWeight.Semibold} color={TextColor.Secondary}>
                {restaurant.name}
              </Text>
              <Text as={TextElement.Paragraph} color={TextColor.Muted} className="mt-2">
                {restaurant.description}
              </Text>
            </div>
          </div>

          {/* Restaurant Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 p-4 bg-gray-50 rounded-2xl">
            {/* Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <Text size={TextSize.ExtraSmall} color={TextColor.Muted}>Address</Text>
                <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium} className="truncate">{restaurant.address}</Text>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <Text size={TextSize.ExtraSmall} color={TextColor.Muted}>Phone</Text>
                <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium}>{restaurant.phone}</Text>
              </div>
            </div>

            {/* License Number */}
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <Text size={TextSize.ExtraSmall} color={TextColor.Muted}>License</Text>
                <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium}>{restaurant.licenseNumber}</Text>
              </div>
            </div>

            {/* Tax ID */}
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <Text size={TextSize.ExtraSmall} color={TextColor.Muted}>Tax ID</Text>
                <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium}>{restaurant.taxId}</Text>
              </div>
            </div>

            {/* Commission Rate */}
            {/* Coordinates */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <Text size={TextSize.ExtraSmall} color={TextColor.Muted}>Location</Text>
                {(restaurant.latitude !== undefined && restaurant.longitude !== undefined) ? (
                  <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium} className="font-mono truncate">
                    {restaurant.latitude.toFixed(4)}, {restaurant.longitude.toFixed(4)}
                  </Text>
                ) : (
                  <Text size={TextSize.ExtraSmall} weight={TextWeight.Medium} className="font-mono truncate">
                    Not set
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>

      </Card>

      {children}
    </div>
  );
}
