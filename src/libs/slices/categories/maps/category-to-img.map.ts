import { CategoryName } from '~/libs/slices/categories/enum/category-name.enum';
import motherboards from '~/assets/img/motherboards.jpg';
import processors from '~/assets/img/processors.jpg';
import ram from '~/assets/img/ram.jpg';
import videoCards from '~/assets/img/video_cards.jpg';
import soundCards from '~/assets/img/sound_cards.jpg';
import hardDisks from '~/assets/img/hard_disks.jpg';
import opticalDrives from '~/assets/img/optical_drives.jpg';
import powerSupplies from '~/assets/img/power_supplies.jpg';
import housings from '~/assets/img/housings.jpg';
import coolingSystems from '~/assets/img/cooling_systems.jpg';
import ups from '~/assets/img/ups.jpg';
import ssd from '~/assets/img/ssd.gif';
import videoCaptureCards from '~/assets/img/video_capture_cards.jpg';
import upsBatteriesAndAccessories from '~/assets/img/ups_batteries_and_accessories.jpg';
import keyboardsAndMice from '~/assets/img/keyboards_and_mice.jpg';
import raidControllers from '~/assets/img/raid_controllers.jpg';
import miniComputers from '~/assets/img/mini_computers.jpg';
import miningEquipment from '~/assets/img/mining_equipment.jpg';
const categoryToImg = {
  [CategoryName.MOTHERBOARDS]: motherboards,
  [CategoryName.PROCESSORS]: processors,
  [CategoryName.RAM]: ram,
  [CategoryName.VIDEO_CARDS]: videoCards,
  [CategoryName.SOUND_CARDS]: soundCards,
  [CategoryName.HARD_DISKS]: hardDisks,
  [CategoryName.OPTICAL_DRIVES]: opticalDrives,
  [CategoryName.POWER_SUPPLIES]: powerSupplies,
  [CategoryName.HOUSINGS]: housings,
  [CategoryName.COOLING_SYSTEMS]: coolingSystems,
  [CategoryName.UPS]: ups,
  [CategoryName.SSD]: ssd,
  [CategoryName.VIDEO_CAPTURE_CARDS]: videoCaptureCards,
  [CategoryName.UPS_BATTERIES_AND_ACCESSORIES]: upsBatteriesAndAccessories,
  [CategoryName.KEYBOARDS_AND_MICE]: keyboardsAndMice,
  [CategoryName.RAID_CONTROLLERS]: raidControllers,
  [CategoryName.MINI_COMPUTERS]: miniComputers,
  [CategoryName.MINING_EQUIPMENT]: miningEquipment,
} as const;

export { categoryToImg };
