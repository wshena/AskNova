import { generateChat } from "@/config/gemini";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateTitle(prompt: string): Promise<string> {
  const instruction = `Buatlah judul singkat (6 kata atau kurang) untuk percakapan berikut, gunakan bahasa yang sesuai dengan prompt, misal jika prompt menggunakan bahasa indonesia maka gunakan bahasa indonesia, jika inggris maka gunakan bahasa inggris. Hanya kembalikan judul tanpa tanda kutip: "${prompt}"`;
  try {
    const title = await generateChat(instruction);
    // Bersihkan hasil agar tidak ada newline atau spasi berlebih
    return title.trim().replace(/\n/g, ' ');
  } catch (err) {
    console.error('generateTitle error:', err);
    // Fallback ke substring prompt jika AI gagal
    return prompt.split(' ').slice(0, 6).join(' ');
  }
}