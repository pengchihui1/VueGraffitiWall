const SMALL_CLASS_NAMES = [
    "sailboat",
    "pliers",
    "see saw",
    "garden hose",
    "cactus",
    "eyeglasses",
    "nose",
    "stairs",
    "envelope",
    "bucket",
    "fireplace",
    "swing set",
    "lantern",
    "banana",
    "spreadsheet",
    "elephant",
    "fish",
    "helicopter",
    "axe",
    "cell phone",
]

const BIG_CLASS_NAMES = [
    "sailboat",
    "pliers",
    "see saw",
    "garden hose",
    "cactus",
    "eyeglasses",
    "nose",
    "stairs",
    "envelope",
    "bucket",
    "fireplace",
    "swing set",
    "lantern",
    "banana",
    "spreadsheet",
    "elephant",
    "fish",
    "helicopter",
    "axe",
    "cell phone",
    "hammer",
    "string bean",
    "donut",
    "star",
    "radio",
    "cat",
    "diamond",
    "frog",
    "broom",
    "coffee cup",
    "speedboat",
    "paper clip",
    "bicycle",
    "map",
    "baseball",
    "tennis racquet",
    "line",
    "dishwasher",
    "paintbrush",
    "fork",
    "teddy - bear",
    "The Mona Lisa",
    "clarinet",
    "flamingo",
    "couch",
    "rainbow",
    "bed",
    "lipstick",
    "parrot",
    "ladder",
    "syringe",
    "violin",
    "megaphone",
    "car",
    "cookie",
    "rollerskates",
    "anvil",
    "goatee",
    "teapot",
    "octagon",
    "hospital",
    "bridge",
    "leg",
    "skull",
    "ear",
    "mushroom",
    "chandelier",
    "pool",
    "crown",
    "apple",
    "golf club",
    "potato",
    "calendar",
    "book",
    "trombone",
    "stove",
    "scorpion",
    "blackberry",
    "circle",
    "sheep",
    "sandwich",
    "bird",
    "bowtie",
    "wine bottle",
    "postcard",
    "power outlet",
    "chair",
    "hedgehog",
    "pants",
    "bread",
    "microwave",
    "t - shirt",
    "rabbit",
    "guitar",
    "dog",
    "bulldozer",
    "bus",
    "light bulb",
    "computer",
    "hexagon",
    "beach",
    "skateboard",
    "barn",
    "jail",
    "waterslide",
    "cooler",
    "traffic light",
    "hand",
    "harp",
    "moon",
    "toe",
    "vase",
    "cello",
    "remote control",
    "truck",
    "microphone",
    "underwear",
    "rifle",
    "drill",
    "square",
    "knee",
    "giraffe",
    "snail",
    "camouflage",
    "table",
    "alarm clock",
    "camel",
    "shorts",
    "lighthouse",
    "suitcase",
    "bottlecap",
    "tractor",
    "carrot",
    "hockey puck",
    "dumbbell",
    "shoe",
    "The Great Wall of China",
    "campfire",
    "foot",
    "flip flops",
    "monkey",
    "helmet",
    "bandage",
    "bench",
    "stethoscope",
    "grass",
    "mermaid",
    "laptop",
    "hot air balloon",
    "floor lamp",
    "cow",
    "dolphin",
    "asparagus",
    "motorbike",
    "skyscraper",
    "strawberry",
    "umbrella",
    "brain",
    "mouth",
    "zebra",
    "jacket",
    "triangle",
    "hurricane",
    "bracelet",
    "pineapple",
    "rake",
    "steak",
    "baseball bat",
    "arm",
    "popsicle",
    "flying saucer",
    "mouse",
    "horse",
    "crab",
    "piano",
    "river",
    "castle",
    "compass",
    "binoculars",
    "ceiling fan",
    "airplane",
    "scissors",
    "garden",
    "bush",
    "bathtub",
    "clock",
    "drums",
    "lobster",
    "flower",
    "diving board",
    "toothbrush",
    "saw",
    "sea turtle",
    "squiggle",
    "tooth",
    "mountain",
    "sword",
    "aircraft carrier",
    "necklace",
    "cup",
    "wine glass",
    "lighter",
    "elbow",
    "blueberry",
    "snowman",
    "broccoli",
    "sun",
    "television",
    "sock",
    "pig",
    "key",
    "parachute",
    "hot tub",
    "shark",
    "washing machine",
    "hat",
    "windmill",
    "frying pan",
    "fire hydrant",
    "toothpaste",
    "belt",
    "beard",
    "rhinoceros",
    "headphones",
    "matches",
    "knife",
    "snorkel",
    "feather",
    "duck",
    "pond",
    "paint can",
    "firetruck",
    "angel",
    "bear",
    "passport",
    "cake",
    "telephone",
    "mosquito",
    "hamburger",
    "pencil",
    "peas",
    "ant",
    "eye",
    "mailbox",
    "grapes",
    "canoe",
    "pillow",
    "The Eiffel Tower",
    "sink",
    "backpack",
    "octopus",
    "finger",
    "snowflake",
    "tent",
    "nail",
    "submarine",
    "wheel",
    "church",
    "toilet",
    "purse",
    "penguin",
    "bee",
    "streetlight",
    "van",
    "boomerang",
    "train",
    "peanut",
    "stop sign",
    "basket",
    "wristwatch",
    "ice cream",
    "pizza",
    "crocodile",
    "lollipop",
    "hockey stick",
    "soccer ball",
    "dragon",
    "camera",
    "cannon",
    "zigzag",
    "spoon",
    "pickup truck",
    "ocean",
    "bat",
    "stitches",
    "shovel",
    "palm tree",
    "mug",
    "hot dog",
    "fan",
    "sweater",
    "cruise ship",
    "cloud",
    "whale",
    "police car",
    "saxophone",
    "squirrel",
    "smiley face",
    "owl",
    "house",
    "school bus",
    "yoga",
    "spider",
    "flashlight",
    "tree",
    "swan",
    "panda",
    "ambulance",
    "calculator",
    "pear",
    "trumpet",
    "lightning",
    "animal migration",
    "dresser",
    "basketball",
    "birthday cake",
    "leaf",
    "oven",
    "house plant",
    "keyboard",
    "eraser",
    "sleeping bag",
    "moustache",
    "door",
    "hourglass",
    "crayon",
    "stereo",
    "fence",
    "roller coaster",
    "onion",
    "marker",
    "tiger",
    "screwdriver",
    "watermelon",
    "lion",
    "butterfly",
    "toaster",
    "raccoon",
    "picture frame",
    "candle",
    "face",
    "kangaroo",
    "snake",
    "tornado",
    "rain"
]

const BIG_CLASS_NAMES_CHINESS=[
    "帆船","鉗子","見鋸","花園軟管","仙人掌","眼鏡","鼻子","樓梯","信封","水桶","壁爐","鞦韆","燈籠","香蕉","電子表格","大象","魚","直升機","斧頭","手機","錘子","四季豆","甜甜圈","星星","收音機","貓","鑽石","青蛙","掃帚","咖啡杯","快艇","回形針","自行車","地圖","棒球","網球拍","線","洗碗機","畫筆","叉子","泰迪熊","蒙娜麗莎","單簧管","火烈鳥","沙發","彩虹","床","口紅","鸚鵡","梯子","注射器","小提琴","擴音器","汽車","餅乾","旱冰鞋","鐵砧","山羊鬍子","茶壺","八角形","醫院","橋","腿","頭骨","耳朵","蘑菇","枝形吊燈","游泳池","皇冠","蘋果","高爾夫俱樂部","土豆","日曆","書","長號","爐子","蝎子","黑莓","圓圈","羊","三明治","鳥","領結","酒瓶","明信片","電源插座","椅子","刺猬","褲子","麵包","微波爐","T卹","兔子","吉他","狗","推土機","公共汽車","燈泡","計算機","六角形","海灘","滑板","穀倉","監獄","滑水道","冷卻器","紅綠燈","手","豎琴","月亮","腳趾","花瓶","大提琴","遙控器","卡車","麥克風","內衣","步槍","鑽頭","廣場","膝蓋","長頸鹿","蝸牛","偽裝","桌子","鬧鐘","駱駝","短褲","燈塔","手提箱","瓶蓋","拖拉機","胡蘿蔔","冰球","啞鈴","鞋","中國長城","篝火","腳","人字拖","猴子","頭盔","繃帶","長凳","聽診器","草","美人魚","筆記本電腦","熱氣球","落地燈","牛","海豚","蘆筍","摩托車","摩天大樓","草莓","雨傘","大腦","嘴巴","斑馬","夾克","三角形","颶風","手鐲","菠蘿","耙子","牛排","棒球棒","手臂","冰棒","飛碟","老鼠","馬","螃蟹","鋼琴","河流","城堡","指南針","雙筒望遠鏡","吊扇","飛機","剪刀","花園","灌木","浴缸","時鐘","鼓","龍蝦","花","跳水板","牙刷","鋸","海龜","波浪線","牙齒","山","劍","航空母艦","項鍊","杯子","酒杯","打火機","肘部","藍莓","雪人","西蘭花","太陽","電視","襪子","豬","鑰匙","降落傘","熱水浴缸","鯊魚","洗衣機","帽子","風車","煎鍋","消防栓","牙膏","腰帶","鬍子","犀牛","耳機","火柴","刀","呼吸管","羽毛","鴨子","池塘","油漆罐","救火車","天使","熊","護照","蛋糕","電話","蚊子","漢堡包","鉛筆","豌豆","螞蟻","眼睛","郵箱","葡萄","獨木舟","枕頭","埃菲爾鐵塔","水槽","背包","章魚","手指","雪花","帳篷","釘子","潛艇","輪子","教堂","廁所","錢包","企鵝","蜜蜂","路燈","麵包車","迴旋鏢","火車","花生","停車標誌","籃子","手錶","冰淇淋","披薩","鱷魚","棒棒糖","曲棍球","足球","龍","相機","大砲","鋸齒形","勺子","皮卡車","海洋","蝙蝠","縫線","鏟子","棕櫚樹","杯子","熱狗","風扇","毛衣","遊輪","雲","鯨魚","警車","薩克斯管","松鼠","笑臉","貓頭鷹","房子","校車","瑜伽","蜘蛛","手電筒","樹","天鵝","熊貓","救護車","計算器","梨","小號","閃電","動物遷徙","梳妝台","籃球","生日蛋糕","葉子","烤箱","室內植物","鍵盤","橡皮擦","睡袋","鬍子","門","沙漏","蠟筆","音響","圍欄","過山車","洋蔥","記號筆","老虎","螺絲刀","西瓜","獅子","蝴蝶","烤麵包機","浣熊","相框","蠟燭","臉","袋鼠","蛇","龍捲風","雨"
]
    
export {
    SMALL_CLASS_NAMES,
    BIG_CLASS_NAMES,
    BIG_CLASS_NAMES_CHINESS
}