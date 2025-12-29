"use client";

import Image from "next/image";
import { useState } from "react";

interface ActivityImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

interface ActivitySection {
  id: string;
  title: string;
  description?: string;
  images: ActivityImage[];
}

// Helper function to generate OP image list
// Note: This generates a large list. In production, you may want to load images dynamically
const generateOPImages = (): ActivityImage[] => {
  const images: ActivityImage[] = [];
  
  // Generate op1.jpg through op141.jpg (some have special names with %20(1))
  for (let i = 1; i <= 141; i++) {
    if (i >= 14 && i <= 31) {
      // These files have special names: op14%20(1).jpg through op31%20(1).jpg
      images.push({
        id: `op-${i}`,
        src: `/legacy/op${i}%20(1).jpg`,
        alt: "Other Padhaai Activity",
        caption: "other Activity",
      });
    } else if (i <= 112 || i === 141) {
      // Regular numbered files: op1.jpg through op112.jpg and op141.jpg
      images.push({
        id: `op-${i}`,
        src: `/legacy/op${i}.jpg`,
        alt: "Other Padhaai Activity",
        caption: "other Activity",
      });
    }
  }
  
  // opi1.jpg through opi26.jpg (skip opi22)
  for (let i = 1; i <= 26; i++) {
    if (i === 8) {
      // opi8%20(2).jpg exists
      images.push({
        id: `opi-${i}`,
        src: `/legacy/opi${i}%20(2).jpg`,
        alt: "Other Padhaai Activity",
        caption: "other Activity",
      });
    } else if (i >= 21 && i <= 26 && i !== 22) {
      // opi21%20(1).jpg, opi23%20(1).jpg through opi26%20(1).jpg
      images.push({
        id: `opi-${i}`,
        src: `/legacy/opi${i}%20(1).jpg`,
        alt: "Other Padhaai Activity",
        caption: "other Activity",
      });
    } else if (i !== 22) {
      // Regular numbered files
      images.push({
        id: `opi-${i}`,
        src: `/legacy/opi${i}.jpg`,
        alt: "Other Padhaai Activity",
        caption: "other Activity",
      });
    }
  }
  
  return images;
};

const activitySections: ActivitySection[] = [
  {
    id: "first-camp-nele",
    title: "First Camp - Nele Tumkur",
    description: "The 12 girls we helped pay the fees - stay at this 'Nele', meaning shelter, in Tumkur.",
    images: [
      {
        id: "1",
        src: "/legacy/first_camp.jpg",
        alt: "The 12 girls we helped pay the fees - stay at this 'Nele', meaning shelter, in Tumkur",
        caption: "The 12 girls we helped pay the fees - stay at this 'Nele', meaning shelter, in Tumkur.",
      },
      {
        id: "2",
        src: "/legacy/first_camp1.jpg",
        alt: "Their book rack on the attic",
        caption: "Their book rack on the attic. — in Tumkur.",
      },
      {
        id: "3",
        src: "/legacy/first_camp2.jpg",
        alt: "The shelter of the girls whose fees was paid by Padhaai",
        caption: "The shelter of the girls whose fees was paid by Padhaai — in Tumkur.",
      },
      {
        id: "4",
        src: "/legacy/first_camp3.jpg",
        alt: "School visit. The school was started in 1983. Has classes Nursery to 7th",
        caption: "School visit. The school was started in 1983. Has classes Nursery to 7th. — in Tumkur.",
      },
      {
        id: "5",
        src: "/legacy/first_camp4.jpg",
        alt: "The girls who needed help with the fees to be able to continue schooling",
        caption: "The girls who needed help with the fees to be able to continue schooling. — in Tumkur.",
      },
      {
        id: "6",
        src: "/legacy/first_camp5.jpg",
        alt: "Tumkur visit",
        caption: "In Tumkur.",
      },
      {
        id: "7",
        src: "/legacy/first_camp6.jpg",
        alt: "The young ones in their classroom",
        caption: "The young ones in their classroom — in Tumkur.",
      },
      {
        id: "8",
        src: "/legacy/first_camp7.jpg",
        alt: "Principal handing over the receipt for the fees paid",
        caption: "Principal handing over the receipt for the fees paid — in Tumkur.",
      },
      {
        id: "9",
        src: "/legacy/first_camp8.jpg",
        alt: "Principal Mrs. Anupama accepting the notebooks",
        caption: "Principal Mrs. Anupama accepting the notebooks — in Tumkur.",
      },
      {
        id: "10",
        src: "/legacy/first_camp9.jpg",
        alt: "Tried telling the kids the initiative called 'Padhaai' and about the well wishers who sent the notebooks",
        caption: "Tried telling the kids the initiative called 'Padhaai' and about the well wishers who sent the notebooks. Shyalaja, a local resident helping with my Kannada. — in Tumkur.",
      },
      {
        id: "11",
        src: "/legacy/first_camp10.jpg",
        alt: "The want to study!",
        caption: "The want to study! — in Tumkur.",
      },
    ],
  },
  {
    id: "yashaswini-hostel",
    title: "Yashaswini Girls Hostel, Chandapura",
    description: "Chandapura - on Hosur Road. The orphanage has 50 girls. Padhaai helped them with the long registers that girls of class 8 to 10 needed.",
    images: [
      {
        id: "12",
        src: "/legacy/Chandapura.jpg",
        alt: "Chandapura - on Hosur Road. The orphanage has 50 girls. Padhaai helped them with the long registers that girls of class 8 to 10 needed",
        caption: "Chandapura - on Hosur Road. The orphanage has 50 girls. Padhaai helped them with the long registers that girls of class 8 to 10 needed.",
      },
      {
        id: "13",
        src: "/legacy/Chandapura1.jpg",
        alt: "The group of girls whose notebooks were funded",
        caption: "The group of girls whose notebooks were funded.",
      },
      {
        id: "14",
        src: "/legacy/Chandapura3.jpg",
        alt: "Mrs. Ashwathamma, their caretaker sharing details about the orphanage",
        caption: "Mrs. Ashwathamma, their caretaker sharing details about the orphanage.",
      },
      {
        id: "15",
        src: "/legacy/Chandapura6.jpg",
        alt: "This is where they live, study, sleep and dream about a good life",
        caption: "This is where they live, study, sleep and dream about a good life.",
      },
    ],
  },
  {
    id: "muthalanur-school",
    title: "Government School at Muthalanur, Hosur Road",
    description: "The Government school at Muthanalur where Padhaai provides educational support.",
    images: [
      {
        id: "16",
        src: "/legacy/muthanalur.jpg",
        alt: "The Government school at Muthanalur",
        caption: "The Government school at Muthanalur.",
      },
      {
        id: "17",
        src: "/legacy/muthanalur1.jpg",
        alt: "Can we give him books to study instead!",
        caption: "Can we give him books to study instead!",
      },
      {
        id: "18",
        src: "/legacy/muthanalur2.jpg",
        alt: "The eagerness in his eyes!",
        caption: "The eagerness in his eyes!",
      },
      {
        id: "19",
        src: "/legacy/muthanalur3.jpg",
        alt: "What does future hold for me?",
        caption: "What does future hold for me?",
      },
      {
        id: "20",
        src: "/legacy/muthanalur9.jpg",
        alt: "The schools lacks furniture entirely!",
        caption: "The schools lacks furniture entirely!",
      },
      {
        id: "21",
        src: "/legacy/muthanallur10.jpg",
        alt: "During the previous camp we couldn't provide books to all the kids",
        caption: "During the previous camp we couldn't provide books to all the kids, hence went back to the school in Muthanallur - and was pleasantly surprised to hear kids call out 'Padhaai' after 3 weeks of the first camp.",
      },
    ],
  },
  {
    id: "field-visits",
    title: "Field visits to identify schools and the children seeking scholarships",
    description: "Field visits to identify schools and the children seeking scholarships.",
    images: [
      {
        id: "22",
        src: "/legacy/Field_visits.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
      {
        id: "23",
        src: "/legacy/Field_visits1.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
      {
        id: "24",
        src: "/legacy/Field_visits2.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
      {
        id: "25",
        src: "/legacy/Field_visits3.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
      {
        id: "26",
        src: "/legacy/Field_visits4.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
      {
        id: "27",
        src: "/legacy/Field_visits5.jpg",
        alt: "Field Visits",
        caption: "Field Visits",
      },
    ],
  },
  {
    id: "other-activities",
    title: "Other Padhaai Activities",
    description: "Various activities and initiatives by Padhaai Trust.",
    images: generateOPImages(),
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<ActivityImage | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("first-camp-nele");

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 relative inline-block">
          Activity
          <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600 mt-2"></span>
        </h1>
        <p className="text-neutral-600 leading-relaxed mt-6 max-w-2xl">
          Explore Padhaai's activities, field visits, and initiatives through images that capture our work in supporting education for economically challenged children.
        </p>
      </div>

      <div className="space-y-16 md:space-y-20">
        {activitySections.map((section) => (
          <div key={section.id} className="space-y-6 section-glow p-6 md:p-8 rounded-lg">
            {/* Section Header */}
            <div>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left group"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 relative inline-block">
                    {section.title}
                    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600 mt-2"></span>
                  </h2>
                  {section.description && (
                    <p className="text-neutral-600 leading-relaxed mt-3 max-w-3xl">
                      {section.description}
                    </p>
                  )}
                </div>
                <svg
                  className={`w-6 h-6 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Section Images */}
            {expandedSection === section.id && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {section.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Hide broken images
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium leading-relaxed">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-[80vh] rounded-sm overflow-hidden mb-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="text-center px-4">
              <p className="text-white text-lg font-medium leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
