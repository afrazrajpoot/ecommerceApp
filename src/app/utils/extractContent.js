import cheerio from "cheerio";

// Function to extract content from HTML
export const extractContent = (html) => {
  const $ = cheerio.load(html);
  const data = {
    videos: [],
    images: [],
    backgroundImages: [],
    lists: [],
    otherContent: [],
    paragraphs: [],
  };

  // Extract videos from iframe elements
  $("iframe").each((i, el) => {
    const src = $(el).attr("src");
    if (src) {
      data.videos.push(src);
    }
  });

  // Extract video URLs from video elements
  $("video").each((i, el) => {
    const src = $(el).attr("src");
    if (src) {
      data.videos.push(src);
    } else {
      // Sometimes, video sources are within <source> tags inside <video>
      $(el)
        .find("source")
        .each((j, source) => {
          const sourceSrc = $(source).attr("src");
          if (sourceSrc) {
            data.videos.push(sourceSrc);
          }
        });
    }
  });
  $("p").each((i, el) => {
    const paragraphText = $(el).text().trim();
    // console.log(paragraphText, "pg"); // Debug log for paragraphs
    if (paragraphText) {
      data.paragraphs.push(paragraphText);
    }
  });

  // Extract video URLs from anchor tags
  $("a").each((i, el) => {
    const href = $(el).attr("href");
    if (href && (href.endsWith(".mp4") || href.includes("youtu") || href.includes("vimeo"))) {
      data.videos.push(href);
    }
  });

  // Extract images
  $("img").each((i, el) => {
    const src = $(el).attr("src");
    const alt = $(el).attr("alt") || "";
    data.images.push({ src, alt });
  });

  // Extract background images
  $("[style*='background-image']").each((i, el) => {
    const style = $(el).attr("style");
    const urlMatch = style.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/i);
    if (urlMatch) {
      data.backgroundImages.push(urlMatch[1]);
    }
  });

  // Extract list items
  $("ul").each((i, el) => {
    const listItems = [];
    $(el)
      .find("li")
      .each((j, li) => {
        listItems.push($(li).text().trim());
      });
    data.lists.push(listItems);
  });

  // Extract other content (example: extracting all text within divs)
  $("div").each((i, el) => {
    const content = $(el).text().trim();
    if (content) {
      data.otherContent.push(content);
    }
  });

  return data;
};
export const extractSpecificContent = (html) => {
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const iframeSrc = $("iframe").attr("src");
  const slug = $("link[rel='canonical']").attr("href")?.split("/").filter(Boolean).pop();

  // Extract the download link
  const downloadLink = $("a.wpdm-download-link").attr("data-downloadurl");

  // Extract the SVG image URL
  const svgImageUrl = $("img.wpdm_icon").attr("src");

  return {
    title: title || "",
    iframeSrc: iframeSrc || "",
    slug: slug || "",
    downloadLink: downloadLink || "", // Ensures empty string if download link not found
    svgImageUrl: svgImageUrl || "", // Ensures empty string if SVG image URL not found
  };
};

// Function to extract iframe URL from meta data
export const extractIframeFromMetaData = (metaData) => {
  const iframeMeta = metaData?.find(
    (item) =>
      item.key.startsWith("_oembed") &&
      typeof item.value === "string" &&
      item.value.includes("<iframe")
  );
  if (iframeMeta) {
    const iframeTag = iframeMeta.value;
    const srcMatch = iframeTag.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : null;
  }

  return null;
};
