export interface Package {
    id: string;
    slug: string;
    title: string;
    duration: string;
    departureDate: string;
    price: string;
    hotelMakkah: string;
    hotelMadinah: string;
    airline: string;
    features: string[];
    image: string;
    isPromo?: boolean;
}

export const PACKAGES: Package[] = [
    {
        id: "1",
        slug: "spesial-umrah-milad-agustus-2026",
        title: "Spesial Umrah Milad",
        duration: "9 Hari", // Default assumption since not specified but standard
        departureDate: "Awal Agustus 2026",
        price: "Rp 29.000.000",
        hotelMakkah: "Matyr Al Jiwar",
        hotelMadinah: "Karam Group",
        airline: "Lion Air (Direct Surabaya)",
        features: [
            "Koper Bagasi & Kabin",
            "Lounge Bandara",
            "Visa Umrah & Asuransi",
            "Muthawwif Berpengalaman",
            "Free 5L Zam-zam (Kondisional)",
            "Free Tahallul & Makan Arab",
        ],
        image: "https://images.unsplash.com/photo-1596720510526-7881c628cac6?q=80&w=1000&auto=format&fit=crop",
        isPromo: true
    },
    {
        id: "2",
        slug: "promo-umrah-ramadhan-awal-2026",
        title: "Promo Awal Ramadhan",
        duration: "16 Hari",
        departureDate: "11 Februari 2026",
        price: "Rp 37.500.000",
        hotelMakkah: "Olayan Golden *3",
        hotelMadinah: "Karam Madinah *3",
        airline: "Lion Air (Direct Surabaya)",
        features: [
            "Program 16 Hari",
            "Awal Ramadhan di Tanah Suci",
            "Full Ibadah Tarawih",
            "Visa Umrah & Asuransi",
            "Perlengkapan Lengkap"
        ],
        image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "3",
        slug: "promo-umrah-ramadhan-tengah-2026",
        title: "Promo Tengah Ramadhan",
        duration: "16 Hari",
        departureDate: "19 Februari 2026",
        price: "Rp 39.500.000",
        hotelMakkah: "Maysan Al Maqom *4",
        hotelMadinah: "Karam Madinah *3",
        airline: "Lion Air (Direct Surabaya)",
        features: [
            "Hotel Bintang 4 Makkah",
            "Pertengahan Ramadhan",
            "Lailatul Qadar Potential",
            "Fasilitas Premium",
            "Visa Umrah & Asuransi"
        ],
        image: "https://images.unsplash.com/photo-1565552629477-cdcbbfd00e6f?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "4",
        slug: "umrah-syawal-2026-option-1",
        title: "Umrah Syawal (Hemat)",
        duration: "13 Hari",
        departureDate: "24 Maret 2026",
        price: "Rp 35.000.000",
        hotelMakkah: "Snood Ajyad *3",
        hotelMadinah: "ODST *3",
        airline: "Lion Air (Direct Surabaya)",
        features: [
            "Suasana Syawal",
            "Program 13 Hari",
            "Harga Ekonomis",
            "City Tour Taif",
            "Perlengkapan Lengkap"
        ],
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "5",
        slug: "umrah-syawal-2026-option-2",
        title: "Umrah Syawal (Nyaman)",
        duration: "13 Hari",
        departureDate: "24 Maret 2026",
        price: "Rp 37.500.000",
        hotelMakkah: "Olayan Ajyad *4",
        hotelMadinah: "Sanabil *4",
        airline: "Lion Air (Direct Surabaya)",
        features: [
            "Upgrade Hotel Bintang 4",
            "Jarak Hotel Lebih Dekat",
            "Menu Masakan Indonesia",
            "City Tour Taif",
            "Bimbingan Eksklusif"
        ],
        image: "https://images.unsplash.com/photo-1548057279-d5d1c238cfc9?q=80&w=1000&auto=format&fit=crop",
    }
];

export const COMMON_INCLUSIONS = [
    "Tiket Pesawat PP (Start Surabaya)",
    "Visa Umrah & Asuransi Perjalanan",
    "Akomodasi Hotel Sesuai Paket",
    "Transportasi Bus AC Eksklusif",
    "Makan 3x Sehari (Menu Indonesia)",
    "Muthawwif & Tour Leader Berpengalaman",
    "Handling Bandara & Lounge",
    "Manasik Umrah 2x",
    "Air Zam-zam 5 Liter (Jika diizinkan)",
    "Perlengkapan Umrah Lengkap (Koper, Tas, Ihram/Mukenah, dll)",
    "Album Kenangan & Sertifikat"
];
