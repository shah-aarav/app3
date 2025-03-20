import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const colorOptions = [
  { value: "bg-blue-100 text-blue-800", label: "Blue" },
  { value: "bg-green-100 text-green-800", label: "Green" },
  { value: "bg-yellow-100 text-yellow-800", label: "Yellow" },
  { value: "bg-purple-100 text-purple-800", label: "Purple" },
  { value: "bg-pink-100 text-pink-800", label: "Pink" },
  { value: "bg-indigo-100 text-indigo-800", label: "Indigo" },
]

interface ColorCustomizationDialogProps {
  categoryColors: Record<string, string>
  onColorChange: (category: string, color: string) => void
}

export function ColorCustomizationDialog({ categoryColors, onColorChange }: ColorCustomizationDialogProps) {
  const [localCategoryColors, setLocalCategoryColors] = useState(categoryColors)

  useEffect(() => {
    setLocalCategoryColors(categoryColors)
  }, [categoryColors])

  const handleColorChange = (category: string, color: string) => {
    setLocalCategoryColors((prev) => ({ ...prev, [category]: color }))
  }

  const handleSave = () => {
    Object.entries(localCategoryColors).forEach(([category, color]) => {
      onColorChange(category, color)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Customize Category Colors</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Category Colors</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(localCategoryColors).map(([category, color]) => (
            <div key={category} className="grid grid-cols-4 items-center gap-4">
              <label htmlFor={`color-${category}`} className="text-right">
                {category.charAt(0).toUpperCase() + category.slice(1)}:
              </label>
              <Select value={color} onValueChange={(value) => handleColorChange(category, value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((colorOption) => (
                    <SelectItem key={colorOption.value} value={colorOption.value}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${colorOption.value.split(" ")[0]}`}></div>
                        {colorOption.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  )
}

