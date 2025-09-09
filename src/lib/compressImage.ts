import tinify from "tinify";

if (!process.env.TINYPNG_API_KEY) {
  throw new Error("TINYPNG_API_KEY environment variable is not set.");
}
tinify.key = process.env.TINYPNG_API_KEY as string;

export async function compressImage(inputPath: string, outputPath: string) {
  try {
    await tinify.fromFile(inputPath).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error("TinyPNG compression failed:", error);
    // fallback: return uncompressed path
    return inputPath;
  }
}
