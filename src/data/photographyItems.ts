const imageModules = import.meta.glob<{ default: string }>(
    '../assets/portfolio/*/*.webp',
    {
        eager: true,
        import: 'default',
    }
);

type CategoryGallery = {
    id: number;
    title: string;
    folder: string;
    thumbnail: string;
    images: string[];
};

type FileEntry = { name: string; src: string };

const rawCategoryMap: Record<string, FileEntry[]> = {};

for (const [path, src] of Object.entries(imageModules)) {
    const match = path.match(/portfolio\/(.*?)\/.*\((\d+)\)\.webp$/);
    if (!match) continue;

    const folder = match[1];
    const filename = match[2];

    if (!rawCategoryMap[folder]) {
        rawCategoryMap[folder] = [];
    }

    rawCategoryMap[folder].push({ name: filename, src: src.default });
}

Object.keys(rawCategoryMap).forEach((folder) => {
    rawCategoryMap[folder].sort((a, b) => Number(a.name) - Number(b.name));
});

export const photographyItems: CategoryGallery[] = Object.entries(rawCategoryMap).map(
    ([folder, files], index) => ({
        id: index + 1,
        title: `${folder} Photography`,
        folder,
        thumbnail: files.length > 0 ? files[0].src : '',
        images: files.map((f) => f.src),
    })
);
console.log('Thumbnails:', photographyItems.map(i => i.thumbnail));

