import { CategoryEntityT } from '~/libs/slices/categories/types/category-entity.type';
import { ValueOf } from '~/libs/types/value-of.type';
import { CategoryName } from '~/libs/slices/categories/enum/category-name.enum';

const categoriesMock: Record<ValueOf<typeof CategoryName>, CategoryEntityT> = {
  [CategoryName.MOTHERBOARDS]: { name: 'Motherboards', id: 0 },
  [CategoryName.PROCESSORS]: { name: 'Processors', id: 1 },
  [CategoryName.RAM]: { name: 'RAM', id: 2 },
  [CategoryName.VIDEO_CARDS]: { name: 'Video cards', id: 3 },
  [CategoryName.SOUND_CARDS]: { name: 'Sound cards', id: 4 },
  [CategoryName.HARD_DISKS]: { name: 'Hard disks', id: 5 },
  [CategoryName.OPTICAL_DRIVES]: { name: 'Optical drives', id: 6 },
  [CategoryName.POWER_SUPPLIES]: { name: 'Power supplies', id: 7 },
  [CategoryName.HOUSINGS]: { name: 'Housings', id: 8 },
  [CategoryName.COOLING_SYSTEMS]: { name: 'Cooling systems', id: 9 },
  [CategoryName.UPS]: { name: 'UPS', id: 10 },
  [CategoryName.SSD]: { name: 'SSD', id: 11 },
  [CategoryName.VIDEO_CAPTURE_CARDS]: { name: 'Video capture cards', id: 12 },
  [CategoryName.UPS_BATTERIES_AND_ACCESSORIES]: {
    name: 'UPS batteries and accessories',
    id: 13,
  },
  [CategoryName.KEYBOARDS_AND_MICE]: { name: 'Keyboards and mice', id: 14 },
  [CategoryName.RAID_CONTROLLERS]: { name: 'RAID controllers', id: 15 },
  [CategoryName.MINI_COMPUTERS]: { name: 'Mini computers', id: 16 },
  [CategoryName.MINING_EQUIPMENT]: { name: 'Mining equipment', id: 17 },
} as const;

export { categoriesMock };
