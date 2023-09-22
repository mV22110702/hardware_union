import {CategoryEntityT} from "~/libs/slices/categories/types/category-entity.type";
import {ValueOf} from "~/libs/types/value-of.type";
import {CategoryName} from "~/libs/slices/categories/enum/category-name.enum";

const categoriesMock: Record<ValueOf<typeof CategoryName>, CategoryEntityT> = {
    [CategoryName.MOTHERBOARDS]: {name: 'Motherboards'},
    [CategoryName.PROCESSORS]: {name: 'Processors'},
    [CategoryName.RAM]: {name: 'RAM'},
    [CategoryName.VIDEO_CARDS]: {name: 'Video cards'},
    [CategoryName.SOUND_CARDS]: {name: 'Sound cards'},
    [CategoryName.HARD_DISKS]: {name: 'Hard disks'},
    [CategoryName.OPTICAL_DRIVES]: {name: 'Optical drives'},
    [CategoryName.POWER_SUPPLIES]: {name: 'Power supplies'},
    [CategoryName.HOUSINGS]: {name: 'Housings'},
    [CategoryName.COOLING_SYSTEMS]: {name: 'Cooling systems'},
    [CategoryName.UPS]: {name: 'UPS'},
    [CategoryName.SSD]: {name: 'SSD'},
    [CategoryName.VIDEO_CAPTURE_CARDS]: {name: 'Video capture cards'},
    [CategoryName.UPS_BATTERIES_AND_ACCESSORIES]: {name: 'UPS batteries and accessories'},
    [CategoryName.KEYBOARDS_AND_MICE]: {name: 'Keyboards and mice'},
    [CategoryName.RAID_CONTROLLERS]: {name: 'RAID controllers'},
    [CategoryName.MINI_COMPUTERS]: {name: 'Mini computers'},
    [CategoryName.MINING_EQUIPMENT]: {name: 'Mining equipment'},
} as const;

export {categoriesMock};
