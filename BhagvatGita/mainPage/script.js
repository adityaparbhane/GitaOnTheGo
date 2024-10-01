// index.js

import { setChapters } from "./data.js";

const options = {
  method: "GET",
  url: "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/",
  params: {
    skip: "0",
    limit: "18",
  },
  headers: {
    "x-rapidapi-key": "75cd3ec86cmshf7e5170fd882720p19120djsn3b2438dab802",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

(async () => {
  try {
    const response = await axios.request(options);
    const chapters = response.data;
    setChapters(chapters);

    const chaptercontainer = document.getElementById("chapter-card-content");

    chapters.forEach((chapter) => {
      const card = document.createElement("a");
      card.className =
        "z-10 flex flex-col rounded-md  bg-[#3E3232] p-6 hover:cursor-pointer hover:outline-gray-600 hover:bg-[#1a1a1a] text-gray-200 hover:outline";
      card.href = `/verse/chapter.html?chapter=${chapter.chapter_number}`;
      card.innerHTML = `
        <h2 class=" font-bold text-orange-400 ">Chapter ${chapter.chapter_number}</h2>
        <h3 class="text-xl font-bold text-white ">${chapter.name_translated}</h3>
        <p class="mt-2 flex-1 text-ellipsis line-clamp-5 text-gray-100" >${chapter.chapter_summary}</p>
        <div class="flex justify-between">
          <div class="mt-4 flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="none"
              class="mr-4"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M1.5 2.125a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75ZM5.656.812a.656.656 0 0 0 0 1.313H15.72a.656.656 0 0 0 0-1.313H5.656Zm0 5.25a.656.656 0 0 0 0 1.313H15.72a.656.656 0 0 0 0-1.313H5.656Zm0 5.25a.656.656 0 0 0 0 1.313H15.72a.656.656 0 0 0 0-1.313H5.656ZM2.375 6.5a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0ZM1.5 12.625a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="mb-0.5"> ${chapter.verses_count}  Verses</span>
          </div>
        </div>
      `;

      chaptercontainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
})();
