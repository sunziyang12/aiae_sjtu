import { Talent } from '../types/talent';

class CollectionService {
  private readonly COLLECTION_KEY = 'talent_collections';

  // 获取所有收藏
  getCollections(): Talent[] {
    const collections = localStorage.getItem(this.COLLECTION_KEY);
    return collections ? JSON.parse(collections) : [];
  }

  // 添加收藏
  addCollection(talent: Talent): void {
    const collections = this.getCollections();
    if (!collections.some(item => item.id === talent.id)) {
      collections.push({ ...talent, isCollected: true });
      localStorage.setItem(this.COLLECTION_KEY, JSON.stringify(collections));
    }
  }

  // 移除收藏
  removeCollection(talentId: number): void {
    const collections = this.getCollections();
    const updatedCollections = collections.filter(item => item.id !== talentId);
    localStorage.setItem(this.COLLECTION_KEY, JSON.stringify(updatedCollections));
  }

  // 更新收藏列表顺序
  updateCollectionsOrder(collections: Talent[]): void {
    localStorage.setItem(this.COLLECTION_KEY, JSON.stringify(collections));
  }

  // 批量删除收藏
  batchRemoveCollections(talentIds: number[]): void {
    const collections = this.getCollections();
    const updatedCollections = collections.filter(item => !talentIds.includes(item.id));
    localStorage.setItem(this.COLLECTION_KEY, JSON.stringify(updatedCollections));
  }

  // 检查是否已收藏
  isCollected(talentId: number): boolean {
    const collections = this.getCollections();
    return collections.some(item => item.id === talentId);
  }
}

export const collectionService = new CollectionService(); 