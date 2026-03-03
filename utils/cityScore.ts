export const calculateCityScore = (commentKarma: number, linkKarma: number, accountCreatedDate: Date) => {
    const ageInYears = (new Date().getTime() - new Date(accountCreatedDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const score = (commentKarma * 2) + (linkKarma * 1.5) + (Math.max(0, ageInYears) * 500);
    return Math.round(score);
};

export const getBuildingLevel = (score: number) => {
    if (score >= 100000) return 5;
    if (score >= 20000) return 4;
    if (score >= 5000) return 3;
    if (score >= 1000) return 2;
    return 1;
};

export const getBuildingDetails = (level: number) => {
    switch (level) {
        case 5: return { type: 'Skyscraper', image: '/images/skyscraper.png' };
        case 4: return { type: 'Tower', image: '/images/tower.png' };
        case 3: return { type: 'Commercial Building', image: '/images/commercial.png' };
        case 2: return { type: 'Apartment', image: '/images/apartment.png' };
        default: return { type: 'Small House', image: '/images/house.png' };
    }
};
