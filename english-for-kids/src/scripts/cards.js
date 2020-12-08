const DATA = [ 
      {
      word: 'boy',
      translation: 'мальчик',
      image: 'assets/img_family/boy.png',
      audioSrc: 'assets/audio/boy.mp3',
      category: 'Family'
    },
    {
      word: 'girl',
      translation: 'девочка',
      image: 'assets/img_family/girl.png',
      audioSrc: 'assets/audio/girl.mp3',
      category: 'Family'
    },
    {
      word: 'mother',
      translation: 'мама',
      image: 'assets/img_family/mother.png',
      audioSrc: 'assets/audio/mother.mp3',
      category: 'Family'
    },
    {
      word: 'father',
      translation: 'папа',
      image: 'assets/img_family/father.png',
      audioSrc: 'assets/audio/father.mp3',
      category: 'Family'
    },
    {
      word: 'sister',
      translation: 'сестра',
      image: 'assets/img_family/sister.png',
      audioSrc: 'assets/audio/sister.mp3',
      category: 'Family'
    },
    {
      word: 'brother',
      translation: 'брат',
      image: 'assets/img_family/brother.png',
      audioSrc: 'assets/audio/brother.mp3',
      category: 'Family'
    },
    {
      word: 'grandpa',
      translation: 'дедушка',
      image: 'assets/img_family/grandad.png',
      audioSrc: 'assets/audio/grandpa.mp3',
      category: 'Family'
    },
    {
      word: 'grandmother',
      translation: 'бабушка',
      image: 'assets/img_family/granny.jpg',
      audioSrc: 'assets/audio/grandmother.mp3',
      category: 'Family'
    },
  
    {
      word: 'cat',
      translation: 'кот',
      image: 'assets/img_animals/cat.png',
      audioSrc: 'assets/audio/cat.mp3',
      category: 'Animals'
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'assets/img_animals/dog.png',
      audioSrc: 'assets/audio/dog.mp3',
      category: 'Animals'
    },
    {
      word: 'elephant',
      translation: 'слон',
      image: 'assets/img_animals/elephant.png',
      audioSrc: 'assets/audio/elephant.mp3',
      category: 'Animals'
    },
    {
      word: 'fox',
      translation: 'лиса',
      image: 'assets/img_animals/fox.png',
      audioSrc: 'assets/audio/fox.mp3',
      category: 'Animals'
    },
    {
      word: 'mouse',
      translation: 'мышка',
      image: 'assets/img_animals/mouse.png',
      audioSrc: 'assets/audio/mouse.mp3',
      category: 'Animals'
    },
    {
      word: 'octopus',
      translation: 'осьминог',
      image: 'assets/img_animals/octopus.png',
      audioSrc: 'assets/audio/octopus.mp3',
      category: 'Animals'
    },
    {
      word: 'parrot',
      translation: 'попугай',
      image: 'assets/img_animals/parrot.png',
      audioSrc: 'assets/audio/parrot.mp3',
      category: 'Animals'
    },
    {
      word: 'rabbit',
      translation: 'заяц',
      image: 'assets/img_animals/rabbit.png',
      audioSrc: 'assets/audio/rabbit.mp3',
      category: 'Animals'
    },
    {
      word: 'apple',
      translation: 'яблоко',
      image: 'assets/img_fruits/apple.png',
      audioSrc: 'assets/audio/apple.mp3',
      category: 'Fruits'
    },
    {
      word: 'banana',
      translation: 'банан',
      image: 'assets/img_fruits/banana.png',
      audioSrc: 'assets/audio/banana.mp3',
      category: 'Fruits'
    },
    {
      word: 'grape',
      translation: 'виноград',
      image: 'assets/img_fruits/grape.png',
      audioSrc: 'assets/audio/grape.mp3',
      category: 'Fruits'
    },
    {
      word: 'kivi',
      translation: 'киви',
      image: 'assets/img_fruits/kivi.png',
      audioSrc: 'assets/audio/kivi.mp3',
      category: 'Fruits'
    },
    {
      word: 'lemon',
      translation: 'лимон',
      image: 'assets/img_fruits/lemon.png',
      audioSrc: 'assets/audio/lemon.mp3',
      category: 'Fruits'
    },
    {
      word: 'orange',
      translation: 'апельсин',
      image: 'assets/img_fruits/orange.png',
      audioSrc: 'assets/audio/orange.mp3',
      category: 'Fruits'
    },
    {
      word: 'pear',
      translation: 'груша',
      image: 'assets/img_fruits/pear.png',
      audioSrc: 'assets/audio/pear.mp3',
      category: 'Fruits'
    },
    {
      word: 'pineapple',
      translation: 'ананас',
      image: 'assets/img_fruits/pineapple.png',
      audioSrc: 'assets/audio/pineapple.mp3',
      category: 'Fruits'
    },
    {
      word: 'cabbage',
      translation: 'капуста',
      image: 'assets/img_vegetables/cabbage.png',
      audioSrc: 'assets/audio/cabbage.mp3',
      category: 'Vegetables'
    },
    {
      word: 'carrot',
      translation: 'морковка',
      image: 'assets/img_vegetables/carrot.png',
      audioSrc: 'assets/audio/carrot.mp3',
      category: 'Vegetables'
    },
    {
      word: 'cucumber',
      translation: 'огурец',
      image: 'assets/img_vegetables/cucumber.png',
      audioSrc: 'assets/audio/cucumber.mp3',
      category: 'Vegetables'
    },
    {
      word: 'garlic',
      translation: 'чеснок',
      image: 'assets/img_vegetables/garlic.png',
      audioSrc: 'assets/audio/garlic.mp3',
      category: 'Vegetables'
    },
    {
      word: 'onion',
      translation: 'лук',
      image: 'assets/img_vegetables/onion.png',
      audioSrc: 'assets/audio/onion.mp3',
      category: 'Vegetables'
    },
    {
      word: 'pea',
      translation: 'горошек',
      image: 'assets/img_vegetables/pea.png',
      audioSrc: 'assets/audio/pea.mp3',
      category: 'Vegetables'
    },
    {
      word: 'potato',
      translation: 'картошка',
      image: 'assets/img_vegetables/potato.png',
      audioSrc: 'assets/audio/potato.mp3',
      category: 'Vegetables'
    },
    {
      word: 'tomato',
      translation: 'помидор',
      image: 'assets/img_vegetables/tomato.png',
      audioSrc: 'assets/audio/tomato.mp3',
      category: 'Vegetables'
    },
    {
      word: 'blackberry',
      translation: 'ежевика',
      image: 'assets/img_berries/blackberry.png',
      audioSrc: 'assets/audio/blackberry.mp3',
      category: 'Berries'
    },
    {
      word: 'blueberry',
      translation: 'голубика',
      image: 'assets/img_berries/blueberry.png',
      audioSrc: 'assets/audio/blueberry.mp3',
      category: 'Berries'
    },
    {
      word: 'cherry',
      translation: 'вишня',
      image: 'assets/img_berries/cherry.png',
      audioSrc: 'assets/audio/cherry.mp3',
      category: 'Berries'
    },
    {
      word: 'chokeberry',
      translation: 'Черноплодная рябина',
      image: 'assets/img_berries/chokeberry.png',
      audioSrc: 'assets/audio/chokeberry.mp3',
      category: 'Berries'
    },
    {
      word: 'cranberry',
      translation: 'клюква',
      image: 'assets/img_berries/cranberry.png',
      audioSrc: 'assets/audio/cranberry.mp3',
      category: 'Berries'
    },
    {
      word: 'gooseberry',
      translation: 'крыжовник',
      image: 'assets/img_berries/gooseberry.png',
      audioSrc: 'assets/audio/gooseberry.mp3',
      category: 'Berries'
    },
    {
      word: 'raspberry',
      translation: 'малина',
      image: 'assets/img_berries/raspberry.png',
      audioSrc: 'assets/audio/raspberry.mp3',
      category: 'Berries'
    },
    {
      word: 'strawberry',
      translation: 'клубника',
      image: 'assets/img_berries/strawberry.png',
      audioSrc: 'assets/audio/strawberry.mp3',
      category: 'Berries'
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'assets/img_clothes/dress.png',
      audioSrc: 'assets/audio/dress.mp3',
      category: 'Clothes'
    },
    {
      word: 'hat',
      translation: 'шапка',
      image: 'assets/img_clothes/hat.png',
      audioSrc: 'assets/audio/hat.mp3',
      category: 'Clothes'
    },
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'assets/img_clothes/skirt.png',
      audioSrc: 'assets/audio/skirt.mp3',
      category: 'Clothes'
    },
    {
      word: 'suit',
      translation: 'костюм',
      image: 'assets/img_clothes/suit.png',
      audioSrc: 'assets/audio/suit.mp3',
      category: 'Clothes'
    },
    {
      word: 'sweater',
      translation: 'свитер',
      image: 'assets/img_clothes/sweater.png',
      audioSrc: 'assets/audio/sweater.mp3',
      category: 'Clothes'
    },
    {
      word: 't-shirt',
      translation: 'майка',
      image: 'assets/img_clothes/t-shirt.png',
      audioSrc: 'assets/audio/t-shirt.mp3',
      category: 'Clothes'
    },
    {
      word: 'trousers',
      translation: 'штаны',
      image: 'assets/img_clothes/trousers.png',
      audioSrc: 'assets/audio/trousers.mp3',
      category: 'Clothes'
    },
    {
      word: 'vest',
      translation: 'жилет',
      image: 'assets/img_clothes/vest.png',
      audioSrc: 'assets/audio/vest.mp3',
      category: 'Clothes'
    },
    {
      word: 'ear',
      translation: 'ухо',
      image: 'assets/img_humanbody/ear.png',
      audioSrc: 'assets/audio/ear.mp3',
      category: 'Body'
    },
    {
      word: 'eye',
      translation: 'глаз',
      image: 'assets/img_humanbody/eye.png',
      audioSrc: 'assets/audio/eye.mp3',
      category: 'Body'
    },
    {
      word: 'finger',
      translation: 'палец',
      image: 'assets/img_humanbody/finger.png',
      audioSrc: 'assets/audio/finger.mp3',
      category: 'Body'
    },
    {
      word: 'foot',
      translation: 'стопа',
      image: 'assets/img_humanbody/foot.png',
      audioSrc: 'assets/audio/foot.mp3',
      category: 'Body'
    },
    {
      word: 'hand',
      translation: 'рука',
      image: 'assets/img_humanbody/hand.png',
      audioSrc: 'assets/audio/hand.mp3',
      category: 'Body'
    },
    {
      word: 'head',
      translation: 'голова',
      image: 'assets/img_humanbody/head.png',
      audioSrc: 'assets/audio/head.mp3',
      category: 'Body'
    },
    {
      word: 'legs',
      translation: 'нога',
      image: 'assets/img_humanbody/legs.png',
      audioSrc: 'assets/audio/legs.mp3',
      category: 'Body'
    },
    {
      word: 'nose',
      translation: 'нос',
      image: 'assets/img_humanbody/nose.png',
      audioSrc: 'assets/audio/nose.mp3',
      category: 'Body'
    },
    {
      word: 'bicycle',
      translation: 'велосипед',
      image: 'assets/img_transport/bicycle.png',
      audioSrc: 'assets/audio/bicycle.mp3',
      category: 'Transport'
    },
    {
      word: 'car',
      translation: 'машина',
      image: 'assets/img_transport/car.png',
      audioSrc: 'assets/audio/car.mp3',
      category: 'Transport'
    },
    {
      word: 'kick scooter',
      translation: 'самокат',
      image: 'assets/img_transport/kickscooter.png',
      audioSrc: 'assets/audio/scooter.mp3',
      category: 'Transport'
    },
    {
      word: 'motorcycle',
      translation: 'мотоцикл',
      image: 'assets/img_transport/motorcycle.png',
      audioSrc: 'assets/audio/motorcycle.mp3',
      category: 'Transport'
    },
    {
      word: 'plane',
      translation: 'самолет',
      image: 'assets/img_transport/plane.png',
      audioSrc: 'assets/audio/plane.mp3',
      category: 'Transport'
    },
    {
      word: 'ship',
      translation: 'лодка',
      image: 'assets/img_transport/ship.png',
      audioSrc: 'assets/audio/ship.mp3',
      category: 'Transport'
    },
    {
      word: 'tractor',
      translation: 'трактор',
      image: 'assets/img_transport/tractor.png',
      audioSrc: 'assets/audio/tractor.mp3',
      category: 'Transport'
    },
];

export default DATA;


