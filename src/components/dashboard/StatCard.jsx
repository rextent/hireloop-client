import { Card } from "@heroui/react";

export default function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card
      className="
        border
        border-default-200
        bg-content1
        p-6
      "
    >
      <div className="flex flex-col gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-default-100
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm text-default-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>
        </div>
      </div>
    </Card>
  );
}