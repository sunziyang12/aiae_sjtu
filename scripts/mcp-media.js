const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 配置
const PEXELS_API_KEY = 'OqmEH5v0PvGkTvrCJYASiKxqdQOlWrqtPPW7NK0TQguUMU9ytuZQjtzF';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'news');

// 确保目录存在
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 下载图片
async function downloadImage(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await sharp(response.data)
      .resize(1200, 800, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`图片已保存: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`下载图片失败: ${error.message}`);
    return false;
  }
}

// 从Pexels搜索图片
async function searchPexelsImage(query) {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: { 'Authorization': PEXELS_API_KEY },
      params: {
        query: query,
        per_page: 1,
        orientation: 'landscape'
      }
    });

    if (response.data.photos && response.data.photos.length > 0) {
      return response.data.photos[0].src.large;
    }
    return null;
  } catch (error) {
    console.error(`搜索图片失败: ${error.message}`);
    return null;
  }
}

// 处理单个新闻项
async function processNewsItem(category, query) {
  const categoryDir = path.join(OUTPUT_DIR, category);
  ensureDirectoryExists(categoryDir);

  const imageUrl = await searchPexelsImage(query);
  if (!imageUrl) {
    console.log(`未找到图片: ${query}`);
    return;
  }

  const outputPath = path.join(categoryDir, `${query}.webp`);
  await downloadImage(imageUrl, outputPath);
}

// 主函数
async function main() {
  console.log('开始下载图片...');

  // 确保输出目录存在
  ensureDirectoryExists(OUTPUT_DIR);

  // 处理所有新闻项
  const newsItems = [
    { category: '赛事活动', query: 'ai-competition' },
    { category: '创业故事', query: 'ai-startup' },
    { category: '政策解读', query: 'education-policy' },
    { category: '赛事活动', query: 'ai-forum' },
    { category: '创业故事', query: 'young-founder' },
    { category: '政策解读', query: 'ai-guidelines' }
  ];

  for (const item of newsItems) {
    console.log(`处理: ${item.category} - ${item.query}`);
    await processNewsItem(item.category, item.query);
  }

  console.log('所有图片下载完成！');
}

main().catch(console.error); 