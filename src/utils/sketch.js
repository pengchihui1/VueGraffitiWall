const image_size = 784;
const classes = ['flashlight', 'belt', 'mushroom', 'pond', 'strawberry', 'pineapple', 'sun', 'cow', 'ear', 'bush', 'pliers', 'watermelon', 'apple', 'baseball', 'feather', 'shoe', 'leaf', 'lollipop', 'crown', 'ocean', 'horse', 'mountain', 'mosquito', 'mug', 'hospital', 'saw', 'castle', 'angel', 'underwear', 'traffic_light', 'cruise_ship', 'marker', 'blueberry', 'flamingo', 'face', 'hockey_stick', 'bucket', 'campfire', 'asparagus', 'skateboard', 'door', 'suitcase', 'skull', 'cloud', 'paint_can', 'hockey_puck', 'steak', 'house_plant', 'sleeping_bag', 'bench', 'snowman', 'arm', 'crayon', 'fan', 'shovel', 'leg', 'washing_machine', 'harp', 'toothbrush', 'tree', 'bear', 'rake', 'megaphone', 'knee', 'guitar', 'calculator', 'hurricane', 'grapes', 'paintbrush', 'couch', 'nose', 'square', 'wristwatch', 'penguin', 'bridge', 'octagon', 'submarine', 'screwdriver', 'rollerskates', 'ladder', 'wine_bottle', 'cake', 'bracelet', 'broom', 'yoga', 'finger', 'fish', 'line', 'truck', 'snake', 'bus', 'stitches', 'snorkel', 'shorts', 'bowtie', 'pickup_truck', 'tooth', 'snail', 'foot', 'crab', 'school_bus', 'train', 'dresser', 'sock', 'tractor', 'map', 'hedgehog', 'coffee_cup', 'computer', 'matches', 'beard', 'frog', 'crocodile', 'bathtub', 'rain', 'moon', 'bee', 'knife', 'boomerang', 'lighthouse', 'chandelier', 'jail', 'pool', 'stethoscope', 'frying_pan', 'cell_phone', 'binoculars', 'purse', 'lantern', 'birthday_cake', 'clarinet', 'palm_tree', 'aircraft_carrier', 'vase', 'eraser', 'shark', 'skyscraper', 'bicycle', 'sink', 'teapot', 'circle', 'tornado', 'bird', 'stereo', 'mouth', 'key', 'hot_dog', 'spoon', 'laptop', 'cup', 'bottlecap', 'The_Great_Wall_of_China', 'The_Mona_Lisa', 'smiley_face', 'waterslide', 'eyeglasses', 'ceiling_fan', 'lobster', 'moustache', 'carrot', 'garden', 'police_car', 'postcard', 'necklace', 'helmet', 'blackberry', 'beach', 'golf_club', 'car', 'panda', 'alarm_clock', 't-shirt', 'dog', 'bread', 'wine_glass', 'lighter', 'flower', 'bandage', 'drill', 'butterfly', 'swan', 'owl', 'raccoon', 'squiggle', 'calendar', 'giraffe', 'elephant', 'trumpet', 'rabbit', 'trombone', 'sheep', 'onion', 'church', 'flip_flops', 'spreadsheet', 'pear', 'clock', 'roller_coaster', 'parachute', 'kangaroo', 'duck', 'remote_control', 'compass', 'monkey', 'rainbow', 'tennis_racquet', 'lion', 'pencil', 'string_bean', 'oven', 'star', 'cat', 'pizza', 'soccer_ball', 'syringe', 'flying_saucer', 'eye', 'cookie', 'floor_lamp', 'mouse', 'toilet', 'toaster', 'The_Eiffel_Tower', 'airplane', 'stove', 'cello', 'stop_sign', 'tent', 'diving_board', 'light_bulb', 'hammer', 'scorpion', 'headphones', 'basket', 'spider', 'paper_clip', 'sweater', 'ice_cream', 'envelope', 'sea_turtle', 'donut', 'hat', 'hourglass', 'broccoli', 'jacket', 'backpack', 'book', 'lightning', 'drums', 'snowflake', 'radio', 'banana', 'camel', 'canoe', 'toothpaste', 'chair', 'picture_frame', 'parrot', 'sandwich', 'lipstick', 'pants', 'violin', 'brain', 'power_outlet', 'triangle', 'hamburger', 'dragon', 'bulldozer', 'cannon', 'dolphin', 'zebra', 'animal_migration', 'camouflage', 'scissors', 'basketball', 'elbow', 'umbrella', 'windmill', 'table', 'rifle', 'hexagon', 'potato', 'anvil', 'sword', 'peanut', 'axe', 'television', 'rhinoceros', 'baseball_bat', 'speedboat', 'sailboat', 'zigzag', 'garden_hose', 'river', 'house', 'pillow', 'ant', 'tiger', 'stairs', 'cooler', 'see_saw', 'piano', 'fireplace', 'popsicle', 'dumbbell', 'mailbox', 'barn', 'hot_tub', 'teddy-bear', 'fork', 'dishwasher', 'peas', 'hot_air_balloon', 'keyboard', 'microwave', 'wheel', 'fire_hydrant', 'van', 'camera', 'whale', 'candle', 'octopus', 'pig', 'swing_set', 'helicopter', 'saxophone', 'passport', 'bat', 'ambulance', 'diamond', 'goatee', 'fence', 'grass', 'mermaid', 'motorbike', 'microphone', 'toe', 'cactus', 'nail', 'telephone', 'hand', 'squirrel', 'streetlight', 'bed', 'firetruck'];
const content=['手電筒','腰帶','蘑菇','池塘','草莓','菠蘿','太陽','牛','耳朵','灌木','鉗子','西瓜','蘋果','棒球','羽毛','鞋子','葉子','棒棒糖','皇冠','海洋','馬','山','蚊子','杯子','醫院' , '鋸', '城堡', '天使', '內衣', '紅綠燈', '遊輪', '標記', '藍莓', '火烈鳥', '臉', '曲棍球棒', '桶', '篝火','蘆筍','滑板','門','手提箱','頭骨','雲','油漆罐','冰球','牛排','室內植物','睡袋','長凳' , '雪人', '手臂', '蠟筆', '扇子', '鏟子', '腿', '洗衣機', '豎琴', '牙刷', '樹', '熊', '耙子', '擴音器','膝蓋','吉他','計算器','颶風','葡萄','畫筆','沙發','鼻子','方形','手錶','企鵝','橋' , '八角形', '潛艇', '螺絲刀', '輪滑鞋', '梯子', 'wine_bottle', '蛋糕', '手鍊', '掃帚', '瑜伽', '手指', '魚', '線', '卡車', '蛇', '公共汽車', '縫線', '浮潛', '短褲','領結','皮卡車','牙齒','蝸牛','腳','螃蟹','校車','火車','梳妝台','襪子','拖拉機','地圖' , '刺猬', '咖啡杯', '電腦', '火柴', '鬍子', '青蛙', '鱷魚', '浴缸', '雨', '月亮', '蜜蜂', '刀', '迴旋鏢','燈塔','枝形吊燈','監獄','游泳池','聽診器','煎鍋','手機','雙筒望遠鏡','錢包','燈籠','生日蛋糕','單簧管' , '棕櫚樹', '航空母艦', '花瓶', '橡皮擦', '鯊魚', '摩天大樓', '自行車', '水槽', '茶壺', '圓圈', '龍捲風', '鳥', '立體聲','嘴','鑰匙','熱狗','勺子','筆記本電腦','杯子','瓶蓋','中國的長城','蒙娜麗莎','笑臉','滑水道','眼鏡' , '吊扇', '龍蝦', '小鬍子', '胡蘿蔔', '花園', '警車', '明信片', '項鍊', '頭盔', '黑莓', '海灘', '高爾夫俱樂部', '汽車','熊貓','鬧鐘','T 卹','狗','麵包','酒杯','打火機','花','繃帶','鑽頭','蝴蝶','天鵝','貓頭鷹','浣熊','波浪線','日曆','長頸鹿','大象','小號','兔子','長號','羊','洋蔥','教堂','人字拖','電子表格' , '梨', '時鐘', '過山車', '降落傘', '袋鼠', '鴨子', '遙控', '指南針', '猴子', '彩虹', '網球拍', '獅子', '鉛筆','字符串豆','烤箱','明星','貓','比薩','足球','注射器','飛碟','眼睛','餅乾','地板燈','鼠標' , '廁所', '烤麵包機', '埃菲爾鐵塔', '飛機', '爐子', '大提琴', '停止標誌', '帳篷', '跳水台', '燈泡', '錘子','蝎子', '耳機','籃子','蜘蛛','紙夾','毛衣','冰淇淋','信封','海龜','甜甜圈','帽子','沙漏','西蘭花','夾克' , '背包', '書', '閃電', '鼓', '雪花', '收音機', '香蕉', '駱駝', '獨木舟', '牙膏', '椅子', '相框', '鸚鵡','三明治','口紅','褲子','小提琴','大腦','電源插座','三角形','漢堡包','龍','推土機','大砲','海豚' ,'澤胸罩','動物遷移','偽裝','剪刀','籃球','肘','傘','風車','桌子','步槍','六角','土豆','鐵砧' , '劍', '花生', '斧', '電視', '犀牛', '棒球棒', '快艇', '帆船', '之字形', '園藝軟管', '河流', '房子', '枕頭','螞蟻','老虎','樓梯','冷卻器','蹺蹺板','鋼琴','壁爐','冰棒','啞鈴','郵箱','穀倉','熱水浴缸' , '泰迪熊', '叉子', '洗碗機', '豌豆', '熱氣球', '鍵盤', '微波爐', '輪子', '消防栓', '麵包車', '相機', '鯨魚' , '蠟燭', '章魚', '豬', '鞦韆椅', '直升機', '薩克斯管', '護照', '蝙蝠', '救護車', '鑽石', '山羊鬍子', '圍欄', '草','美人魚','摩托車','麥克風','腳趾','仙人掌','指甲','電話','手','松鼠','路燈','床','救火車' ]; 
const k = 10;
let model;
let cnv;

const options=[]
// 開始塗污
function startEvent(e){
  const option=content[Math.floor(Math.random()*content.length)]
  if(!options.length){
    options.push(option)
  }
}

// 第一题
function firstOption(){
  startEvent()
  select('#checkpoint').html(`塗鴉 ${options.length}/6`);
  select('#option').html(`${options[0]}`);
}
// 点击知道了
function knowButton(){
  const main= select('#mainContent')
  // main.style('display');
  console.log(select('#mainContent'))
  // 
}

// 倒計時
function startCountdown(seconds) {
  let counter = seconds;
  const interval = setInterval(() => {
    counter--;
    if (counter <= 0 ) {
      clearInterval(interval);
    }
  }, 1000);
}

// 隨機題目
function mathContent(contentArr,len){
  var arr=[];
  for(var i=0;i<contentArr.length;i++){//一个从0到100的数组
      arr.push(i);
  }
  arr.sort(function(){//随机打乱这个数组
      return Math.random()-0.5;
  })
  arr.length=len;//改写长度
  return contentArr.filter((item,index)=>arr.includes(index))
}

async function loadMyModel() {
  // 在await该模型关键字等待浏览器加载
  model = await tf.loadLayersModel('model/model.json');
  model.summary();
}

function setup() {
  loadMyModel();
  firstOption()
  cnv = createCanvas(400, 400);
  background(255);
  cnv.mouseReleased(guess);//鼠标释放
  cnv.parent('canvasContainer');

  let guessButton = select('#guess');
  guessButton.mousePressed(guess);

  let clearButton = select('#clear');
  clearButton.mousePressed(() => {
    background(255);
    select('#res').html('');
  });
}

function guess() {
  // Get input image from the canvas
  const inputs = getInputImage();
 
  // Predict 将返回形状的概率[N, 100]
  let guess = model.predict(tf.tensor([inputs]));

  // Format res to an array
  const rawProb = Array.from(guess.dataSync());

  // Get top K res with index and probability
  const rawProbWIndex = rawProb.map((probability, index) => {
    return {
      index,
      probability
    }
  });

  const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);//概率排序
  const topKClassWIndex = sortProb.slice(0, k);//拿取最高概率的10个
  const topKRes = topKClassWIndex.map(i => `<br>${content[i.index]} (${(i.probability.toFixed(2) * 100)}%)`);//前几个名及百分比
  select('#res').html(`I see: ${topKRes.toString()}`);
}

function getInputImage() {
  let inputs = [];
  // p5 function, get image from the canvas
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
  let oneRow = [];
  for (let i = 0; i < image_size; i++) {
    let bright = img.pixels[i * 4];
    let onePix = [parseFloat((255 - bright) / 255)];
    oneRow.push(onePix);
    if (oneRow.length === 28) {
      inputs.push(oneRow);
      oneRow = [];
    }
  }

  return inputs;
}

function draw() {
  strokeWeight(5); // 画笔大小
  stroke(0);
  if (mouseIsPressed) { //鼠标按下
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}