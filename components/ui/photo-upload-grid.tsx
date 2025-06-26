"use client";

import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlotProps {
  large?: boolean;
  label?: string;
}

function Slot({ large, label }: SlotProps) {
  return (
    <div
      className={cn(
        "border-2 border-dashed border-gray-200 rounded-lg bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center cursor-pointer transition-colors",
        large ? "h-[210px]" : "h-24"
      )}
    >
      <Upload className="h-6 w-6 text-gray-400 mb-1 p-1 !border-2 !border-dashed !border-gray-400" />
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </div>
  );
}

export function PhotoUploadGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* featured */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Featured photos<span className="text-red-500">*</span>
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 row-span-2">
            <Slot large label="Upload cover photo" />
          </div>
          {[...Array(4)].map((_, i) => (
            <Slot key={i} />
          ))}
        </div>
      </div>

      {/* more */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          More photos<span className="text-gray-500"> (optional)</span>
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Slot key={i} />
          ))}
        </div>
      </div>

      {/* videos */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-600">
          Videos <span className="text-gray-500">(optional)</span>
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full w-8 h-8 p-0 text-gray-400 hover:text-gray-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
