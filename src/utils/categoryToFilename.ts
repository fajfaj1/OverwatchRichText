export function categoryToFilename(category: string) {
    return category.toLowerCase().replaceAll(/\s/g, '_');
}
