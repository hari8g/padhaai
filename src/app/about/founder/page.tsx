import Image from "next/image";

export default function FounderPage() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center">
          Founder
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {/* Left Column - Founder Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 relative inline-block">
              MADHAVI LOKHANDE
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600"></span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-64 md:w-72 h-96 sm:h-[28rem] md:h-[32rem] flex-shrink-0">
              <Image
                src="/images/founder.jpg"
                alt="Madhavi Lokhande"
                fill
                className="object-cover rounded-sm"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 256px, 288px"
              />
            </div>

            <div className="space-y-4 text-neutral-700 leading-relaxed text-sm md:text-base flex-1">
              <p>
                Madhavi Lokhande holds a Ph.D. in 'Micro credit for MSMEs in India' from the SNDT University. 
                She is a fellow of the The Institute of Cost Accountants of India.
              </p>
              
              <p>
                She teaches courses in finance, leadership, strategy and has this ability to challenge her 
                students to learn more. She has authored several cases and research articles and likes to 
                contribute to the body of knowledge in the area of Management.
              </p>
              
              <p>
                She has also led the entrepreneurship vertical at her campus and was a member of the mentors 
                team under the Goldman Sachs 10k women entrepreneurship program in India. Her contribution in 
                areas of academic administration and institution building have been recognized and appreciated 
                by senior leadership at the institution and other stakeholders.
              </p>
              
              <p className="font-medium text-neutral-900">
                Her passion for girl child education encouraged her to start 'Padhaai' that works towards 
                inclusive education.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Education in India */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 relative inline-block">
              EDUCATION IN INDIA
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600"></span>
            </h2>
          </div>

          <div className="space-y-6 text-neutral-700 leading-relaxed text-sm md:text-base">
            <p>
              Education in India is provided by both the public and private sectors, with control and funding 
              coming from three levels: central, state, and local. India has made significant progress in recent 
              years with increasing primary education enrollment rates and expanding literacy. The National Education 
              Policy (NEP) 2020 has been a transformative step, focusing on universal access, equity, quality, and 
              accountability. The private education market in India has grown substantially and is now valued at 
              over $100 billion, representing a significant portion of the education sector.
            </p>
            
            <p>
              However, India continues to face critical challenges. Despite improvements, approximately 20% of the 
              population remains functionally illiterate. While primary school enrollment has improved significantly, 
              there are still concerns about retention rates and learning outcomes. Only about 50% of students 
              complete secondary education, and approximately 26% reach higher education institutions. The quality 
              of education, both at primary and higher levels, varies significantly across regions and institutions, 
              with rural and economically disadvantaged areas facing greater challenges in terms of infrastructure, 
              teacher quality, and learning resources.
            </p>
            
            <p>
              Gender disparity in education remains a pressing issue, particularly in rural areas, where girls face 
              barriers to accessing quality education. The COVID-19 pandemic further highlighted the digital divide, 
              affecting millions of students who lack access to online learning resources. Organizations like Padhaai 
              play a crucial role in bridging these gaps by providing scholarships, educational resources, and support 
              to economically challenged children, particularly focusing on inclusive education and empowering the 
              girl child.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

