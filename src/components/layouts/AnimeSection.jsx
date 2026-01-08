import React from "react";

export const AnimeSection = ({ titleSection, data }) => {
  const skeletonCardNbr = 5;

  return (
    <section className="max-w-7xl mx-auto flex justify-center items-center">
      <div className="px-4 py-8 text-white w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4">
            {titleSection}
          </h2>
        </div>

        <div className="flex overflow-x-auto xl:overflow-x-hidden gap-4 pb-6 scrollbar-hide snap-x snap-mandatory transition-all">
          {data.length > 0 ? (
            data?.map((anime, index) => (
              <div
                key={index}
                className="flex-none w-40 md:w-60 snap-start group"
              >
                <div className="relative aspect-2/3 rounded-lg overflow-hidden border border-slate-800 transition-transform duration-300 group-hover:scale-95">
                  <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <button className="w-full py-2 bg-indigo-600 text-xs font-bold rounded hover:bg-indigo-500 transition-colors cursor-pointer">
                      SEE MORE
                    </button>
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-medium leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {anime.title}
                </h3>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-5">
                {Array.from({ length: skeletonCardNbr }, (_, i) => (
                  <div key={i} className="animate-pulse w-52 h-72 rounded-lg overflow-hidden bg-gray-400"></div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
