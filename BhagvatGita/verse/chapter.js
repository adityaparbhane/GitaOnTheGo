document.getElementById("loadingIndicator1").classList.remove("hidden");
document.getElementById("scrollToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

import { getChapters } from "../mainPage/data.js";

const contentButton = document.getElementById("contentButton");
const popupCard = document.getElementById("popupCard");

const contentButtonMobile = document.getElementById("contentButtonMobile");
const popupCardSmall = document.getElementById("popupCardSmall");

const chapterBtn = document.getElementById("chapterBtn");
const chapterListSm = document.getElementById("chapterListSm");
const chapterDropdown = document.getElementById("chapterDropdown");
const chapterList = document.getElementById("chapterList");

// get verses tags
const verseBtn = document.getElementById("verseBtn");
const verseDropdown = document.getElementById("verseDropdown");
const versesListSm = document.getElementById("versesListSm");
const verseList = document.getElementById("verseList");

const hamburgerButton = document.getElementById("hamburgerButton");
const hamburgerMenu = document.getElementById("hamburgerMenu");
// logic to get the query of the calling chapter from index.js
const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  //   console.log(urlParams);
  return urlParams.get(param);
};
const chapterNumber = getQueryParam("chapter");

// logic to get the chapter from data.js
const waitForChapter = () => {
  return new Promise((resolve) => {
    const check = () => {
      const chapter = getChapters();
      if (chapter.length > 0) {
        resolve(chapter);
      } else {
        setTimeout(check, 1000);
      }
    };
    check();
  });
};

const chapters = await waitForChapter();

// logic to toggle the card of content for large screen

contentButton.addEventListener("click", () => {
  popupCard.classList.toggle("hidden");
});
popupCard.addEventListener("click", (event) => {
  if (event.target === popupCard) {
    popupCard.classList.add("hidden");
  }
});

//logic to toggle the card for small screen

contentButtonMobile.addEventListener("click", function () {
  popupCardSmall.classList.toggle("hidden");
});
popupCardSmall.addEventListener("click", function (event) {
  if (event.target === popupCardSmall) {
    popupCardSmall.classList.add("hidden");
    resetSelections();
  }
});

// get chapter logic
const populateChapter = () => {
  const chapterList1 = document.getElementById("chapterList1");
  const chapterList2 = document.getElementById("chapterList2");

  const midIndex = Math.ceil(chapters.length / 2);
  // chapter from 1 to 9 for content card
  chapters.slice(0, midIndex).forEach((chapter) => {
    const chapterButton = document.createElement("button");
    chapterButton.className =
      "text-left w-full px-4 py-2 text-gray-400 hover:text-orange-400 cursor-pointer bg-gray-800 rounded";
    chapterButton.textContent = ` Chapter ${chapter.chapter_number}`;
    chapterButton.addEventListener("click", () => showVerses(chapter));
    chaptersList1.appendChild(chapterButton);
  });
  // chapter after 9 to 18 for content card
  chapters.slice(midIndex).forEach((chapter) => {
    const chapterButton = document.createElement("button");
    chapterButton.className =
      "text-left w-full px-4 py-2 text-gray-400 hover:text-orange-400 cursor-pointer bg-gray-800 rounded";
    chapterButton.textContent = ` Chapter ${chapter.chapter_number}`;
    chapterButton.addEventListener("click", () => showVerses(chapter));
    chaptersList2.appendChild(chapterButton);
  });
};
// verse count for content card
const showVerses = (chapter) => {
  document.getElementById("chapterTitle").textContent = chapter.name_translated;
  const versesContainer = document.getElementById("versesContainer");
  versesContainer.innerHTML = ""; // Clear previous verses
  for (let i = 1; i <= chapter.verses_count; i++) {
    const verseButton = document.createElement("button");
    verseButton.className =
      "w-8 h-8 flex items-center justify-center hover:bg-orange-300 rounded-full cursor-pointer";
    verseButton.textContent = i;
    versesContainer.appendChild(verseButton);
  }
};

// get chapter for Smallcard

chapters.forEach((chapter) => {
  const li = document.createElement("li");
  li.className = "cursor-pointer py-2 px-4 hover:bg-[#3E3E3E]";
  li.textContent = ` Chapter ${chapter.chapter_number}`;
  li.addEventListener("click", function () {
    const chapternum = chapter.chapter_number;
    chapterListSm.textContent = ` Chapter ${chapter.chapter_number}`;
    chapterDropdown.classList.add("hidden");

    fetchVerse(chapternum);
  });

  chapterList.appendChild(li);
});
//toggle btn chapter
chapterBtn.addEventListener("click", function () {
  chapterDropdown.classList.toggle("hidden");
});

// toggle li btn
verseBtn.addEventListener("click", function () {
  verseDropdown.classList.toggle("hidden");
});

// logic to close the list
window.addEventListener("click", function (event) {
  if (!chapterBtn.contains(event.target)) {
    chapterDropdown.classList.add("hidden");
  }
  if (!verseBtn.contains(event.target)) {
    verseDropdown.classList.add("hidden");
  }
});

const resetSelections = () => {
  chapterListSm.textContent = "Select Chapter";
  versesListSm.textContent = "Select Verse";
  verseList.innerHTML = ""; // Clear previous verses
};

// api for verses
document.getElementById("loadingIndicator2").classList.remove("hidden");
const fetchVerse = async (chapternum) => {
  const url1 = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapternum}/verses/`;
  const options1 = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "75cd3ec86cmshf7e5170fd882720p19120djsn3b2438dab802",
      "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
    },
  };

  document.getElementById("loadingIndicator").classList.remove("hidden");

  try {
    const response = await fetch(url1, options1);
    const Verses = await response.json();

    const verseContainer = document.getElementById("verses");

    verseList.innerHTML = ""; // Clear previous verses
    versesListSm.textContent = "Select Verse";

    Verses.forEach((verse) => {
      const card = document.createElement("div");
      card.className =
        "max-w-sm rounded-lg bg-[#1a1a1a] hover:bg-[#3E3E3E] text-white m-2";
      card.innerHTML = ` 
      <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-orange-500"> Verse ${verse.verse_number}</div>
      <p class="text-base"> ${verse.translations[4]?.description}</p>
      </div>
      <div class="px-6 py-4">
        <a>
          <button class="bg-orange-500  text-white font-bold py-2 px-4 rounded">Learn More
          </button>
        </a>
      </div>
      `;
      verseContainer.append(card);

      const li = document.createElement("li");
      li.className = "cursor-pointer py-2 px-4 hover:bg-[#3E3E3E]";
      li.textContent = `Verse ${verse.verse_number}`;
      li.onclick = () => {
        versesListSm.textContent = `Verse ${verse.verse_number}`;
        verseDropdown.classList.add("hidden");
        console.log(
          `Selected Chapter: ${chapterNumber}, Verse: ${verse.verse_number}`
        );
      };
      verseList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loadingIndicator").classList.add("hidden");
    document.getElementById("loadingIndicator2").classList.add("hidden");
  }
};
fetchVerse(chapterNumber);

// api for chapters
const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "75cd3ec86cmshf7e5170fd882720p19120djsn3b2438dab802",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

// content logic
(async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const chapterDetailsContainer = document.getElementById(
      "chapter-detail-container"
    );

    const main = document.createElement("div");
    main.className =
      "relative mx-auto max-w-5xl px-4 py-24 text-center font-inter sm:px-6 ";
    main.innerHTML = `
    <div class="relative z-10">
    <a class="fixed left-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border   hover:cursor-pointer hover:brightness-100 dark:border-gray-600 dark:bg-dark-100  hover:bg-[#252525]" href="/verse/chapter.html?chapter=${
      result.chapter_number === 1 ? 18 : result.chapter_number - 1
    }">
      <svg width="6" height="10" fill="none" xmlns="http://www.w3.org/2000/svg" class="dark:text-gray-50">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.707.293a1 1 0 0 1 0 1.414L2.414 5l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0Z" fill="currentColor">
        </path>
      </svg>
    </a>
   <a class="fixed right-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border   hover:cursor-pointer hover:brightness-100 dark:border-gray-600 hover:bg-[#252525]" href="/verse/chapter.html?chapter=${
     result.chapter_number === 18 ? 1 : result.chapter_number + 1
   }">
    <svg width="6" height="10" fill="none" xmlns="http://www.w3.org/2000/svg" class="dark:text-gray-50">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor">
      </path>
    </svg>
  </a>
    </div>
    <h2 class="font-medium uppercase text-orange-400 text-paragraph " >Chapter ${
      result.chapter_number
    }</h2>
    <h1 class="my-8 font-extrabold text-white text-4xl" >${
      result.name_translated
    }</h1>
    <p class="mt-3 text-left text-white text-paragraph leading-loose divider line one-line mb-4 px-1" >${
      result.chapter_summary
    }</p>
    `;

    const versesContainer = document.createElement("div");
    versesContainer.className =
      "mx-auto max-w-5xl px-4 font-inter sm:px-6 border-t border-b border-gray-300 py-8 box-border"; // Adjusted border color

    versesContainer.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <span class="text-lg font-bold text-white">${result.verses_count} Verses</span>
        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded" placeholder="Go To Verse" />
          <div class="relative">
            <button class="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded inline-flex items-center">
              <span>Sort</span>
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    chapterDetailsContainer.appendChild(main);
    chapterDetailsContainer.appendChild(versesContainer);
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loadingIndicator1").classList.add("hidden");
  }
})();

if (hamburgerButton && hamburgerMenu) {
  hamburgerButton.addEventListener("click", function () {
    if (hamburgerMenu.classList.contains("hidden")) {
      hamburgerMenu.classList.remove("hidden");
    } else {
      hamburgerMenu.classList.add("hidden");
    }
  });
} else {
  console.error("Hamburger button or menu not found");
}

window.addEventListener("scroll", () => {
  const scrollToTop = document.getElementById("scrollToTop");
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

populateChapter();
