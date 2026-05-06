const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";

const videoContainer = document.getElementById("videoContainer");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

async function fetchVideos() {
  try {
    loading.style.display = "flex";

    const response = await fetch(API_URL);

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }

    const videos = result.data.data;

    displayVideos(videos);

    loading.style.display = "none";
  } catch (error) {
    loading.style.display = "none";

    errorDiv.classList.remove("hidden");

    errorDiv.innerText = error.message;
  }
}

function displayVideos(videos) {
  videoContainer.innerHTML = "";

  videos.forEach((video) => {
    const videoData = video.items;

    const snippet = videoData.snippet;

    const thumbnail = snippet.thumbnails.high.url;

    const title = snippet.title;

    const channelTitle = snippet.channelTitle;

    const publishedAt = new Date(snippet.publishedAt).toDateString();

    const card = document.createElement("div");

    card.className =
      "bg-[#181818] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-2xl transition duration-300 cursor-pointer";

    card.innerHTML = `
    
      <img
        src="${thumbnail}"
        alt="${title}"
        class="w-full h-52 object-cover"
      />

      <div class="p-4">

        <div class="flex gap-3">

          <div
            class="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-lg font-bold shrink-0"
          >
            ${channelTitle.charAt(0)}
          </div>

          <div>

            <h2 class="font-semibold text-md line-clamp-2 mb-2">
              ${title}
            </h2>

            <p class="text-gray-400 text-sm">
              ${channelTitle}
            </p>

            <p class="text-gray-500 text-sm">
              ${publishedAt}
            </p>

          </div>

        </div>

      </div>
    `;

    videoContainer.appendChild(card);
  });
}

fetchVideos();
