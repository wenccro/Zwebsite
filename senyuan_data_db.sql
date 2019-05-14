/*
SQLyog Ultimate v10.51 
MySQL - 5.0.96-community-nt : Database - senyuan_data_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`senyuan_data_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `senyuan_data_db`;

/*Table structure for table `about_table` */

DROP TABLE IF EXISTS `about_table`;

CREATE TABLE `about_table` (
  `ID` int(11) NOT NULL auto_increment,
  `company_profile` text COMMENT '公司简介',
  `company_honor_url` varchar(50) default NULL COMMENT '公司荣誉图片',
  `company_culture_title` varchar(20) default NULL COMMENT '企业文化标题',
  `company_culture_content` varchar(200) default NULL COMMENT '企业文化内容',
  `company_course_time` varchar(20) default NULL COMMENT '发展历程的时间',
  `company_course_incident` varchar(200) default NULL COMMENT '发展历程的事件',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `about_table` */

/*Table structure for table `admin_table` */

DROP TABLE IF EXISTS `admin_table`;

CREATE TABLE `admin_table` (
  `ID` int(11) NOT NULL auto_increment,
  `username` varchar(20) default NULL,
  `userpwd` varchar(50) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `admin_table` */

insert  into `admin_table`(`ID`,`username`,`userpwd`) values (2,'admin','720faae0c580fa7ef3346db45863352d');

/*Table structure for table `homes_maintenance` */

DROP TABLE IF EXISTS `homes_maintenance`;

CREATE TABLE `homes_maintenance` (
  `ID` int(11) NOT NULL auto_increment,
  `hmaint_title` varchar(200) NOT NULL,
  `hmaint_content` text,
  `news_time` varchar(100) default NULL,
  `isheadline` int(10) NOT NULL default '0',
  `news_image` varchar(100) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `homes_maintenance` */

insert  into `homes_maintenance`(`ID`,`hmaint_title`,`hmaint_content`,`news_time`,`isheadline`,`news_image`) values (3,'万一红木家具遇到水该怎么办？','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">在日常的生活中，特别是在南方的3-4月份，空气水分较大，地面潮湿的时候比较多，雨水过量进入房屋导致红木家具泡水严重，就很容易使家具变形，会直接影响到红木家具寿命将会大大的缩减，那么红木家具遇到水该如何处理呢？</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">1.如果您的红木家具进水了，千万不要拿到太阳底下去暴晒，水泡会涨开，如果再晒的话就会缩起来，这样的热胀冷缩多极度的破坏红木家具，如果红木家具里有的金属部分最怕生锈，泡了水后一定要擦拭干净，每一个接缝、卡椎等大小面积都不能忽略，并用防锈剂擦拭，保证没有水渍。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">2.如果是红木办公家具进水，一定要在阴凉的地方风干，如果表面有刮伤的情况，可以在表面擦上亮光漆，获取一层保护。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">3.最好是在家具的脚上垫一些东西，隔离一下和地面的接触，然后可以考虑在家具的特定地方放置一些干燥剂。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">4.如果您的家具受损特别的厉害，建议您不要私自的进行处理，赶快送到专业的家具店让专业的人员进行处理。</span></p><p><br/></p>','2018-09-07-18-51-29',1,'38b1b102458083a0babf15fb52380e55.jpg'),(4,'冬季红木家具的保养','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">冬季到了，畏于天气的寒冷，人们都穿上了沉重的大衣，精致考究的红木家具怎样才能安然无恙地度过整个冬天，保持栩栩如生的状态呢？</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">一、在摆放红木家具时，要注意让家具远离热源，最少保持1米左右的距离。红木家具离热源太近，容易造成红木内的水分因蒸发而导致家具缝口的开裂和榫卯的收缩。榫卯变形后，面板就容易开裂。冬季保养，最好在红木家具的背部、侧面都擦上蜂蜡；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">二、室内尽可能增加湿度，如经常用湿布擦地、使用加湿器或养鱼，这些，对人与家具都有好处；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">三、红木家具的摆放要注意平和正，家具整体要与地面保持垂直，否则极易引起家具整体和门等部位的变形，最终造成缝口开缝，有损家具的寿命；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">四、不要用湿布去擦红木家具的灰尘，应首先用鸡毛掸将家具浮面灰尘轻轻拂去，再用纯棉干布擦，以免颗粒灰尘伤害家具表层；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">五、移动红木家具时最好搬起才移动，不要生拉硬拽，否则，容易造成家具腿足下端的劈裂；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">六、有抽屉的红木家具，建议在抽屉底面或抽屉架上滴上几滴蜡，减少磨擦，延长使用寿命；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">七、红木家具最好不要直接放在湿度高的器物旁；</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">八、新红木家具有时会突发嘣嘣的响声，响声是由于家具面板收缩而引发的正常现象。让家具过一个冬天后，可让厂家上门维修保养，使其恢复面貌。</span> </p><p style=\"text-indent: 2em;\"><span style=\"font-family: NSimSun; font-size: 14px;\"><span style=\"line-height: 2;\">冬季气候比较干燥，尤其是北方地区，入冬供暖之后，室内温度提高让红木家具中的水分加速蒸发，若保养不好，会造成家具干裂，影响红木家具整日的欣赏价值和收藏价值。为防患于未然，红木爱好者</span><span style=\"line-height: 2;\">们在冬季要给</span></span><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具</span><span style=\"font-family: NSimSun; font-size: 14px;\"><span style=\"line-height: 2;\">做好“</span><span style=\"line-height: 2;\">护肤”，以增强抵抗力。</span></span></p><p><br/></p>','2018-09-07-18-53-56',1,'34e1ef2119037b917a3806a0b879f11b.jpg'),(5,'红木家具日常养护之法','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具因其精美的结构和耐用的品质受到消费者青睐，但由于木材本身的特性，红木家具需要日常保养。夏季到了，多雨且闷热的气候对红木家具的保养更具挑战性，所以，夏季更应注重红木家具的保养。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>红木家具需摆放得当</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具的摆放应当尽量避免阳光直射，夏季白天较长，日照时间偏多，家具若长时间承受紫外线照射，容易产生开裂或者变形。若屋内空间有限，无法将红木家具远离窗户，可以挑选遮阳效果较好的的窗帘。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">在摆放家具的时候，最好用软薄垫将家具同地面接触的部位隔开，同时让家具的靠墙部位同墙壁保持一厘米左右的间隙，这些主要是为了隔离墙面和地面的潮气。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>注意室内温度与湿度</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具对于环境的要求比较苛刻，湿度与温度的变化会使红木家具产生变形与开裂。红木家具适宜的环境温度在20摄氏度左右，而夏季通常气候炎热，这时，可用一些浅底敞口器皿中倒入清水，放置在红木家具下方，通过清水的自然挥发，即可以降低室内的温度，又可以起到加湿的作用，提高红木家具的使用寿命。如果室温过高也可使用空调来进行调节，但切记不可用空调直吹红木家具。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">夏季多雨可以利用干燥剂、除湿包和活性炭等控制室内湿度。如今，超市里有不少专用于防潮的产品，可根据实际需要购置。但使用一段时间后，要将盒或包中的物质取出，重新放些石灰或者散装干燥剂使用。在干燥剂的选择上，以吸水树脂和木炭为制作原料的除湿包较好，适合放置于空间较小的位置，如衣柜、鞋柜等密闭的空间，这样针对性强、效果明显。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如遇连续降雨，空气湿度较大的情况下，通常可以用空调的除湿功能对室内湿度进行把控，但使用空调除湿见效慢缓慢，一般需要两、三个小时才能起效。如果条件允许，还可使用专业除湿机进行除湿。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">对于已经略微变形的家具，可将发生变形的地方摆正，用硬纸板顶住，放置一段时间后，变形的位置便可以恢复原样。而对于已经开裂的红木家具，应及时联系厂家或专业的公司进行修补。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>日常使用与护理应特别注意</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">镂空与雕花是红木家具的一大特色，也正是这些部位格外容易积灰，不仅影响漂亮，也是让红木家私迅速“变老”的杀手。平时可用质地细软的毛刷将尘埃轻轻拂去，再用柔软的干棉布慢慢擦洗。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">用湿布擦拭红木家具也是一大禁忌，由于夏季开窗时间较多，室外的粉尘颗粒会附着在家具表面，与湿布中的水分合后会形成颗粒状，成磨损家具外表，对家具造成伤害，导致使家具外表日后开裂。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">在擦拭过程中，一定不可使用洗洁精或清洁剂一类的化学制剂，这些会对家具产生腐蚀作用，从而使光滑的家具表面黯淡无光。如有需要，可在擦拭时蘸少量的专用蜡，顺着木纹的肌理进行来回擦拭。</span></p><p><br/></p>','2018-09-07-18-54-33',0,'788efc8bd2a7755d6866553ce0f7d582.jpg'),(6,'如何修复红木家具上的痕迹','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具</span><span style=\"line-height: 2; font-size: 14px;\"><span style=\"font-family: NSimSun;\">始于明朝。其外观形体简朴对称，天然材色和纹理宜人。按照国家技术监督局的有关规定，所谓红木家具主要是指用紫檀木，酸枝木、乌木、</span><a href=\"http://www.328f.cn/mucai/hualimu/\" target=\"_blank\"><span style=\"color: rgb(229, 51, 51); font-family: NSimSun;\">花梨木</span></a><span style=\"font-family: NSimSun;\">、鸡翅木制成的家具，除此之外的木材制作家具都不能称为红木家具。紫檀木是红木中的极品，其木质坚。</span></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>烫痕的修复：</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\"><a href=\"http://www.328f.cn/\" target=\"_blank\"><span style=\"color: rgb(229, 51, 51); font-family: NSimSun;\">红木家具</span></a><span style=\"font-family: NSimSun;\">表面直接放置盛热水的器皿，会在红木家具上留下白色的圆疤。一般只要及时擦抹就会除去。但若烫痕过深，则须用普通的碘酒轻轻抹在上面，或在烫痕上涂一些凡士林，过两天后，用软布擦拭，就可将烫痕除去。也可以用软布蘸酒精、香水或煤油，用力擦拭，白色的烫痕也会除去，除去烫痕后应用软布蘸清水擦一遍，再涂上一层光蜡。</span></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>刮痕的修复：</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如</span><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">果红木家具不小心被刮伤，但未触及漆膜下的木质，可用棉布蘸少许熔化的蜡液，涂</span><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">在漆膜擦伤处，覆盖伤痕。待蜡质变硬后，再涂一层，如此反复几次，刮痕就不明显了。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>烧痕的修复：</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如果</span><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具</span><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">的漆膜被烟头或未熄灭的火柴等灼烧留下焦痕，而未烧焦漆膜下的木质，可用一小块细纹硬布，包一根筷子头，轻轻擦抹灼烧痕迹，然后，涂上一层薄蜡液，焦痕即可除去。</span></p><p><br/></p>','2018-09-07-18-55-13',0,'67acf1d6afa26bd386ae336417b93458.jpg'),(7,'换季了 红木家具要记得保养','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">红木家具因其木质坚韧经久耐用收到消费者青睐，但名贵木材制成的高品位家具要合理使用，注意四季妥善保养，才能延长使用寿命，干燥的春季来了，红木家具保养技巧要收好哦。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">使用蜂蜡进行烫蜡处理是适宜红木家具的一种保养方法。用蜡是为了填补木材本身棕眼里的空间，置换木材里的一部分水分，形成保护层，防止湿度变化使木材造成较大的伸缩变化。传统的烫蜡工艺分烫蜡、起蜡、擦蜡三大步骤，要使用木炭，有明火，操作起来比较费事。这种保养方法不可自行操作，因此，消费者可以找厂家进行烫蜡处理，也可以请专业的红木家具保养公司来做。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">春季北方风沙较大，尤其刮沙尘暴的日子，一天不擦，家具上定会蒙上一层沙土。日常生活中，主妇们常常要对家具进行清洁和保养，以使它们保持亮泽。但是你也许不知道，一些错误的清洁保养方法，虽然暂时能让家具变干净，但实际上却对家具造成了潜在的伤害，随着使用时间的增加，你的家具便会出现无法弥补的问题。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">对家具进行清洁保养时，一定要注意使用清洁的纯棉软布，切忌用湿布，而且必须在掸掉红木家具表面灰尘后轻轻地顺着红木本身的纹理擦拭，否则，就会损坏蜡或漆膜，造成家具不应有的胀裂现象。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">北方春季空气干燥，所以要适当给家具加湿。最简单的办法就是在家具下面放置一些浅底敞口盛水器皿，里面加些水，这样通过水分的自然蒸发，来调节室内湿度。当然，也可以在地板上适当洒些水，同样可以起到加湿的作用。气温变化大，建议此时不要使用空调，因为这时的热风对家具容易造成伤害。一些厚重棉被或衣物即将整理存储起来。这时一定要记住，将衣物存储时不要生挤硬装，要适当合理摆放。如果塞得太满，随着干湿的过度，到了雨季，湿度加大，容易造成家具变形，影响家具的正常使用。家具的门关上后，如果发现门面四个点不在一个平面上，说明家具已经变形了，这时把门关好，把它推到位，将发生变形的地方用纸板顶住，此门暂时不要使用，这样经过一段时间，不严重的变形可以恢复。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">春季气温变化大，停暖气后，放置红木家具的屋子不要使用空调，因为这时的热风对家具容易造成伤害。忌干燥，故红木家具特别不宜受到暴晒，不要把家具直接放在暖气炉、壁炉、等高温处；在室内摆放的位置应远离门口、窗口、风口等空气流动较强的部位，切忌空调对着家具吹。</span></p><p><br/></p>','2018-09-07-18-55-55',1,'12f605baee5ab510637c779f7a67207a.jpg'),(8,'古家具的保养和投资','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\"><strong>基础保养：</strong>家具买来之后先用洗洁精彻底清洗，干透之后均匀地在表面上蜡（可用电吹风熔解蜡块，均匀地吹开），上蜡半小时后，用干布擦一遍。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\"><strong>日常保养：</strong>每2－3周上一次蜡，防止暴晒，防止接触滚烫的器物，平时要用干布擦拭，尽量少沾水。搬动家具时切忌拖动。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">从投资角度讲，明清家具的升值潜力并不相同，大致可分为两种情况：</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">一、最具升值潜力的家具只有两类：一类是明代和清代早期在文人指点下制作的明式家具，木质一般都是黄花梨；另一类是清朝康雍乾三代由皇帝亲自监督、宫廷艺术家指导、挑选全国最好的工匠在紫禁城里制作的清代宫廷家具，木质一般是紫檀。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">二、对于那些没有太多钱，但又对明清家具感兴趣的人，不妨选择明清的民间家具收藏，不仅价格便宜，而且很少有伪品。不过其升值空间相对要小得多。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\"><strong>明式家具</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">明式家具最显著的特征是它具有极高的审美价值和文化内涵。它不事雕琢，充分发挥和展示了优质木材的质地、色泽和纹理的自然美，并且工艺精巧，是我国传统家具史上的高峰。以现代科学的眼光看，明式家具的比例合理，体现了完美的尺度和人体科学，符合现代人“回归自然，返璞归真”的追求。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\"><strong>清式家具</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-size: 14px;\">清式家具与明式家具比较而言，在造型和装饰上具有追求富丽华贵，繁缛雕琢的风气，一反明式家具数百年形成的古朴之风，以华丽为追求目标，极尽工匠之能事。家具以造型厚重，形体庞大为特点。清式家具的精品集中在康雍乾时代，富贵华丽的特点正符合现代人追求富裕生活的心态。</span></p><p><br/></p>','2018-09-07-18-56-27',0,'7c7b7d80798c5285d2598263ba499461.jpg');

/*Table structure for table `nature_produce_table` */

DROP TABLE IF EXISTS `nature_produce_table`;

CREATE TABLE `nature_produce_table` (
  `ID` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL COMMENT '属性名称  如材质，空间',
  `details` varchar(800) NOT NULL COMMENT '属性详情  如 客厅*/*衣柜',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `nature_produce_table` */

insert  into `nature_produce_table`(`ID`,`name`,`details`) values (1,'材质','海棠木*/*乌丝檀木'),(2,'空间','客厅*/*书房*/*餐厅*/*卧室*/*其他'),(14,'名称','客厅组合*/*书房组合*/*餐厅组合*/*卧室组合*/*衣柜*/*梳妆台*/*花架*/*椅子*/*电视柜');

/*Table structure for table `news_table` */

DROP TABLE IF EXISTS `news_table`;

CREATE TABLE `news_table` (
  `ID` int(11) NOT NULL auto_increment,
  `news_title` varchar(200) NOT NULL,
  `news_content` text,
  `news_time` varchar(100) default NULL,
  `isheadline` int(5) NOT NULL default '0',
  `news_image` varchar(50) default NULL,
  `new_image_title` varchar(50) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `news_table` */

insert  into `news_table`(`ID`,`news_title`,`news_content`,`news_time`,`isheadline`,`news_image`,`new_image_title`) values (1,'客厅中茶几摆放也有风水讲究','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">客厅中式装修上的茶几摆放其实也是存在一定的风水讲究。客人在客厅之内喝茶聊天，若是没有茶几，肯定十分的不方便。所以，古韵轩设计师将为业主们介绍下家居客厅中的茶几如何摆设，看看有何风水讲究。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\"><strong>第一、沙发是主、茶几是宾。</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">客厅中式装修上沙发比较高，属于山的象征。而茶几比较矮属于砂水，二者之间相互配合，才能协调唯美，才符合风水之道。沙发主宜高大，茶几宾宜矮小，若是客厅茶几的面积太大，会出现喧宾夺主的情况，并非吉兆。所以中式装修上的沙发前的茶几摆设不宜太大。适中为宜。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\"><strong>第二、茶几形状，长方形及椭圆形最好，圆形也行。</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">带有尖角的棱形茶几属于不规则的形状，所以不宜在家庭客厅之内选用。茶几形状，长方形及椭圆形最好，圆形也行。主要是根据业主的喜好去看，倘若沙发之前的空间不足，可以把茶几摆设在沙发的一边。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\"><strong>第三、选茶几，宜以与膝盖持平才行。</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">如果有人坐沙发的时候，茶几的高度没有高过膝盖，则合乎理想，最多也只能与膝盖处持平，不可高过膝盖。此外，摆放在沙发之前的茶几一定要具备足够的空间，若是沙发与茶几的距离太近，不但起坐不便利，还会导致运势受损。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\"><strong>第四、茶几的材质要得当</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">茶几材质最好结合主人的命理所喜五行和行业的关系等进行选择，这样才更加利于主人运势。一般来说，最常用的茶几材质多为石材或木材，可作为一种穏重和权势的象征来开运。</span></p><p><br/></p>','2018-9-5-14-29-48',0,'33c7ae8d9122da0a24cccf1bfd9e3b89.jpg',NULL),(2,'教你挑选与红木家具绝配的地板','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">红木家具的文化底蕴、风格气质，自然不言而喻，而且其本身具有很强的包容性。但想让红木家具与地板搭配起来更合拍，那可是比较讲究的一件事儿了。一般来说，更多的品牌会建议使用木地板来进行搭配。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">实木地板多分为深色系和浅色系。在搭配选择中有三个选择原则，一是同色系相配，二是近色系相配，三是对比色系相配。红木家具类似黄橡木和红樱桃木之间的颜 色。对于颜色偏浅的红木家具，建议使用同色系搭配。搭配地板如果选择同色系搭配，可以选择同样浅色的实木地板，如杏仁色等。对于颜色较深的红木家具，搭配 地板如果尝试对比色系搭配，可采用颜色黄中偏白，浅黄色的枫木地板，这样就可以形成对比效果，但要慎用。当然，也可以选择同色系搭配。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">在纹路上，为凸显红木家具本身的雕刻气质，因此用来搭配的地板不宜花哨和复杂。纹路清晰、简单、温馨的木色最是适宜。倘若实在拿不准的话，不妨先看准几款自己中意的木地板，然后再购买红木家具时进行比对、挑选。</span></p><p><br/></p>\r\n','2018-9-5-14-30-30',0,'6845063984982ee1c0d05a20154fec40.jpg',NULL),(3,' 红木家具如何融入现代家居环境','<p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">最近几年，红木家具异军突起，成为装修市场新贵。在有一定经济实力、年龄又偏成熟的消费者中，红木家具更是广受欢迎。在装修时，他们喜欢购买红木家具来彰显家居品味。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">然而，从深宅大院中传承而来的红木家具，如何才能顺利融入相对逼仄狭窄的现代居住环境，而不显得太过生硬、老气横秋？</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">让红木家具融入现代家居，难吗？其实，不难。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">1、硬装宜简洁不宜花哨</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">要让红木家具融入现代户型，最基础也是最重要的前提是：硬装jue对不能过于花哨。大量使用红木家具的古人的居住环境，室内装饰本来就以素雅的白墙青砖为主。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具本身已经雕刻精细、色泽深重，很有分量感，如果在硬装时过于追求华丽效果，会让整个家居环境变得太过浮夸，而显得不和谐。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">复杂的吊顶、带花纹的壁纸、特殊造型的墙面装饰线条、过于华丽的灯光设计等硬装常见的元素都应该尽量避免。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">特别是，现代居住环境往往是在多层或高层的楼房中，居住面积比传统的院落要狭窄逼仄很多，这就更需要给红木家具腾出展示的空间。如果打定主意要使用红木家具，那在硬装时，应该尽量以简洁为上。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">2、灵活地运用古典元素</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">在硬装时，灵活地多运用一些古典元素，会让红木家具的气场与家居环境更合拍。比如，古朴的石材是红木家具的好搭档，在装饰背景墙时，可以选用青砖、红砖铺设，效果出众。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">地砖不宜使用亮面砖，用哑光的水泥砖、仿古砖、青石板砖通铺地面，会将红木家具衬托得更有气质。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">室内设计师慧慧则建议，使用红木家具时，软装上需要花更多心思。多使用绸、缎、丝、麻等材料以及刺绣或印花图案的软垫、靠枕、桌旗、帐幔、灯罩等，可以柔化红木家具过于坚硬的线条。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">多增加梅、兰、竹、菊、石榴等绿植作为摆设点缀，也可以让家居环境更生动。</span> </p><p style=\"text-indent: 2em;\"><span style=\"color: rgb(51, 51, 51); line-height: 2; font-family: NSimSun; font-size: 14px;\">另外，如果不是购买整套红木家具，而是使用少量红木家具作为点缀，不妨试试古物新用、大胆混搭，比如用yao柜做CD架、用樟木箱做茶几、用斗柜做电视柜等等，展现另类的美感。</span></p><p><br/></p>','2018-9-5-14-31-19',0,'589a57db064f93a6f0e00c414bdc4807.jpg',NULL),(4,'红木家具这么摆最美！','<p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">红木家具是中国最有韵味的家具，不管是中式家居还是现代家居、欧式家居，都能融入其中，让居室更精彩。那么，把红木家具买回家，应该怎么摆放？今天，从全红木家居和红木混搭型家居两个方面，向大家一一讲述。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>大厅入口或玄关：放置条案、屏风</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">现代家居中，玄关是开门后的第一道风景，也是给人第一印象的地方，反映了主人文化气质。如在现代居室玄关处放置一香几或条案，案上放一青花瓶或两边置绿色盆景，客人进门便觉古意盎然。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>客厅：红木沙发、宝座尽显大方</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">现代居室中客厅仍是陈设重点，是展示主人品味的空间。祥云、如意、卷书红木沙发，或软体配搭红木的新中式沙发则是非常不错的选择。另外造型优美、工艺精湛的宝座、罗汉床等大型坐具也是不少现代家庭在中客厅的首要选择。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>书房：书案、书柜、配搭官帽椅</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">书房又称书斋，是文人活动的主要场所。古人在其中读书、写字、抚琴赏玩古董等，通常布置较为雅静。书房家具陈设上，视觉重心与功能重心由在书案的摆放来获得平衡。同时，常配有官帽椅或扶手椅及书橱等家具，另外放置书匣、笔筒、笔架等。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>卧室：架子床、顶箱柜、屏风增添古韵</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">古人几乎把所有象征吉祥、长寿和幸福祈愿的符号都附于床榻和卧室里了。我们常见的卧室古典家具有雕龙刻凤的架子床、用木精良的顶箱柜外，还有雅致韵味的梳妆台、五屉柜和屏风类等等古典家具。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>把空间通过古典家具衔接起来</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如果户型比较大，在一些靠近窗的公共空间，可以摆一两件古典家具，比如摆一张低矮的床榻，又或者是摆一把宽大的“四出头”官帽椅，主人坐在这里，眼睛往窗外看，室内和室外就有了对话。也可以在靠近窗子的位置摆上一个花几，但尺度就要非常讲究了，要严格到“多一分则多，少一分则少”的地步，只有挑选得恰到好处，才能营造出“往窗外望是风景，往窗内看是意境”的效果。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>颜色不同，通过配件来调和</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如果你喜欢的古典家具颜色偏深，但你又喜欢清新的家居设计风格，此时，你可以把墙刷白，整体设计按现代简约风格去装修，比如家具用米白色或浅色系的都没问题。最后，把你喜欢的古典家具放进去，通过摆件的搭配来完成与整体空间的呼应。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>中西混，首选清式古典家具</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如果是给欧式风格的大宅搭配红木家具，雕刻精美、焕彩生辉的清式古典家具会更加适合。一是因为清式红木家具颜色偏深，和金色、银色易配，而欧式大宅往往喜欢用金箔、银箔做装饰；二是清式红木家具雕工精美，形态稳重，在欧式大宅里能“压得住场”。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>古今混，明式家具是主角</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">如果你家里是现代风格的装修，我们可以尝试搭配明式古典家具。明式古典家具形制简约、体态优美、气质空灵，既可以给家里带来一股文人气，又不会让家里显得太繁琐。茶几、圈椅、花几、案几，都是现代风格家居的好朋友。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\"><strong>繁简混，把焦点放在家具上</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: NSimSun; font-size: 14px;\">这一点在一些欧洲人的家里尤其容易看到，他们的家具可能是从世界各地淘回来的，有很多细节可看，有很多故事可讲，但他们通常不做天花吊顶，墙上也没有复杂的装饰，他们只是通过高矮、远近、大小的搭配来展示这些家具。</span></p><p><br/></p>','2018-9-5-14-35-55',1,'2e9e2097aa820b3beb8f5dd1a49a0b8f.jpg',NULL),(5,' 冥想，一椅足矣','<p></p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">抑郁和焦虑是现代生活里的高发心理问题，研究发现，冥想是治疗这些“心病”不错的疗法。每天花上10-20分钟做冥想练习，不仅可以让人的心情保持平和、舒缓压力，还能提高大脑效率和免疫力。</span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\"><strong>冥想回归禅意绵延</strong></span> </p><p style=\"text-indent: 2em;\"><span style=\"line-height: 2; font-family: SimSun; font-size: 14px;\">起源于东方宗教文化的冥想，在减压、启智方面与古代修禅有异曲同工之妙。禅在原初意义上是指佛教僧侣的一种基本功、一种修行方法，而冥想则是实现修禅入定的途径，因此，冥想和禅本是一个不可分割的完整系统。然而随着瑜伽在全球的风靡和修禅文化的式微，冥想似乎成了与瑜伽等现代养生方式更亲近的一种“功法”。</span></p><p><br/></p>','2018-9-5-14-36-37',0,'a50b728e374f70b7c84269a0dd2f6a7f.jpg',NULL);

/*Table structure for table `picture_table` */

DROP TABLE IF EXISTS `picture_table`;

CREATE TABLE `picture_table` (
  `ID` int(11) NOT NULL auto_increment,
  `image_url` varchar(100) NOT NULL,
  `main_iamge` int(2) NOT NULL default '0' COMMENT '1是主要图片，0是次要图片',
  `C_ID` int(11) NOT NULL,
  `submit_time` varchar(50) NOT NULL COMMENT '提交时间  2018-08-13-10-08-23',
  PRIMARY KEY  (`ID`),
  KEY `C_ID` (`C_ID`),
  CONSTRAINT `tt` FOREIGN KEY (`C_ID`) REFERENCES `product_piture_table` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

/*Data for the table `picture_table` */

insert  into `picture_table`(`ID`,`image_url`,`main_iamge`,`C_ID`,`submit_time`) values (36,'1.jpg',0,1,'2018-9-5-12-08-52'),(37,'2.jpg',0,2,'2018-9-5-12-10-42'),(38,'3.jpg',0,3,'2018-9-5-12-10-58'),(39,'4.jpg',0,4,'2018-9-5-12-11-14'),(40,'fba233641175a87a1cfa8f043e14fda5.jpg',0,5,'2018-9-5-16-18-40'),(41,'b240c038c7a780045b40779ac542d902.jpg',0,6,'2018-9-5-14-09-32'),(42,'6a118856f51348107b490a79175a11b3.jpg',0,7,'2018-9-5-16-19-49'),(43,'8d06e8d9ddde9b45543b98226a449030.jpg',0,8,'2018-9-5-16-21-01'),(44,'828f468ffa29439d8eeef51f73ac7109.jpg',0,9,'2018-9-5-16-21-39'),(45,'e0ad40f6dc8df84eaf423e471e2df85f.jpg',0,10,'2018-9-5-16-22-53'),(46,'6d1504627c053efff856a5550302d51c.jpg',0,11,'2018-9-5-16-23-20'),(47,'6df32aa0ad29ee77ba85d78d4eddd2a9.jpg',0,12,'2018-9-5-16-24-00'),(48,'36f2a7ba9f58d6dfd93b15bc1dc12dfd.jpg',1,13,'2018-9-6-09-20-39'),(49,'7801bc5e21016c8bf8df609bedeb822f.jpg',1,14,'2018-9-6-09-26-32'),(50,'c13be9e32368eed456061d8369669a41.jpg',1,15,'2018-9-6-09-27-40'),(51,'e3ec6d340f093fef37d39857c7aae67d.jpg',1,16,'2018-9-6-09-36-56'),(52,'3f5c1fe38457f9176c2a03d14b78b2d0.jpg',1,17,'2018-9-6-09-38-55'),(53,'cf41f2f9261f64c951307bbd151355f0.jpg',1,18,'2018-9-6-09-39-48'),(54,'27213129a75b2b6fe99c319066d3adf9.jpg',1,19,'2018-9-6-09-41-26'),(55,'ca1d171ae580f9f733d49da179cc6c61.png',0,19,'2018-9-6-09-42-02'),(56,'bd9f2b1cc69bb4ebe33c9ffad17be3ec.jpg',1,20,'2018-9-6-09-46-40'),(57,'c45cae9319b263b58b2adc4180688465.jpg',1,21,'2018-9-6-09-47-46'),(59,'e02c07c43e93287513868756d3a39c69.jpg',1,23,'2018-9-6-09-51-24'),(60,'8930999cca15d6065eb6a64356c7f5ae.png',0,23,'2018-9-6-09-51-48'),(62,'a9af57d1ed9fb25922034ea8f7c33556.jpg',1,26,'2018-9-6-10-40-03'),(63,'bc157a0c93493de5cacee3e11834da70.png',0,26,'2018-9-6-10-40-32'),(64,'e75ff2e72bfeffbba441dec77226bde8.jpg',1,27,'2018-9-6-10-41-22'),(65,'128228b328d38aebc86b6d6f67234ecb.jpg',1,28,'2018-9-7-16-15-30'),(66,'186e995d76eedef55cdf21e6dcc33450.jpg',1,29,'2018-9-7-16-16-23'),(67,'364d4d09301ae6e04412d97b9d124670.png',0,29,'2018-9-7-16-16-59'),(68,'83d43b937a0a6e95a20b0797eaa8befb.png',0,29,'2018-9-7-16-17-30'),(69,'3e234b216150fb86b1107dc25260adae.jpg',1,30,'2018-9-7-16-18-56'),(70,'9f10cfae4392a94572d249d5a98b394c.jpg',1,31,'2018-9-7-16-19-55'),(71,'991805efa972be1bd75ce843860e7517.jpg',1,32,'2018-9-7-16-22-00'),(72,'b13b7ae0c7146ec4c89a80c180a94756.jpg',1,33,'2018-9-7-16-22-52'),(73,'b584bf615b9b9ab19960a5ca3539298a.jpg',1,34,'2018-9-7-16-23-38'),(74,'41347fbde2153fef0295ff35185dd49e.jpg',1,35,'2018-9-7-16-25-45'),(75,'2d4b61c790bf001ede63558a9d72ba4b.jpg',1,36,'2018-9-7-16-26-41'),(76,'a4d0414c5017e904bf29b7712f35053d.jpg',1,37,'2018-9-7-16-27-29');

/*Table structure for table `product_piture_table` */

DROP TABLE IF EXISTS `product_piture_table`;

CREATE TABLE `product_piture_table` (
  `ID` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL COMMENT '产品名字',
  `nature_details` varchar(200) default NULL COMMENT '//属性详情  如 类型存储  海棠木*/*书法*/*客厅  组合',
  `iscarousel` int(2) NOT NULL default '0' COMMENT '1是轮播  0是不轮播（默认）',
  `product_carousel` varchar(200) default NULL COMMENT '只有轮播的有简介',
  `details_carousel` text COMMENT '详情简介',
  `design_concept` varchar(200) default NULL COMMENT '设计理念',
  `isstar_pro` int(2) NOT NULL default '0' COMMENT '是否是明星产品',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

/*Data for the table `product_piture_table` */

insert  into `product_piture_table`(`ID`,`name`,`nature_details`,`iscarousel`,`product_carousel`,`details_carousel`,`design_concept`,`isstar_pro`) values (1,'dadfad',NULL,1,'dafda',NULL,NULL,0),(2,'p2',NULL,1,'dddddd',NULL,NULL,0),(3,'p3',NULL,1,'ddddd',NULL,NULL,0),(4,'p4',NULL,1,'dddd',NULL,NULL,0),(5,'明星产品1',NULL,0,NULL,NULL,'设计巧妙',1),(6,'明星产品2',NULL,0,NULL,NULL,'设计巧妙',1),(7,'明星产品3',NULL,0,NULL,NULL,'搭配巧妙',1),(8,'明星4',NULL,0,NULL,NULL,'明星3',1),(9,'明星5',NULL,0,NULL,NULL,'搭配合理',1),(10,'6',NULL,0,NULL,NULL,'美观',1),(11,'dd',NULL,0,NULL,NULL,'d',1),(12,'e',NULL,0,NULL,NULL,'dd',1),(13,'1','海棠木*/*卧室*/*衣柜',0,NULL,'',NULL,0),(14,'1','海棠木*/*卧室*/*梳妆台',0,NULL,'',NULL,0),(15,'2','海棠木*/*卧室*/*梳妆台',0,NULL,'',NULL,0),(16,'花架','海棠木*/*其他*/*花架',0,NULL,'',NULL,0),(17,'椅子','海棠木*/*其他*/*椅子',0,NULL,'',NULL,0),(18,'椅子','海棠木*/*其他*/*椅子',0,NULL,'',NULL,0),(19,'卧室组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(20,'卧室组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(21,'卧室组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(23,'卧室组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(26,'客厅组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(27,'卧室组合','海棠木*/*卧室*/*卧室组合',0,NULL,'',NULL,0),(28,'餐厅组合1','海棠木*/*餐厅*/*餐厅组合',0,NULL,'',NULL,0),(29,'餐厅组合2','海棠木*/*餐厅*/*餐厅组合',0,NULL,'',NULL,0),(30,'书房组合1','海棠木*/*书房*/*书房组合',0,NULL,'',NULL,0),(31,'书房组合2','海棠木*/*书房*/*书房组合',0,NULL,'',NULL,0),(32,'电视柜1','海棠木*/*客厅*/*电视柜',0,NULL,'',NULL,0),(33,'电视柜2','海棠木*/*客厅*/*电视柜',0,NULL,'',NULL,0),(34,'电视柜3','海棠木*/*客厅*/*电视柜',0,NULL,'',NULL,0),(35,'客厅组合1','海棠木*/*客厅*/*客厅组合',0,NULL,'',NULL,0),(36,'客厅组合2','海棠木*/*客厅*/*客厅组合',0,NULL,'',NULL,0),(37,'客厅组合3','海棠木*/*客厅*/*客厅组合',0,NULL,'',NULL,0);

/*Table structure for table `telephone_table` */

DROP TABLE IF EXISTS `telephone_table`;

CREATE TABLE `telephone_table` (
  `ID` int(11) NOT NULL auto_increment,
  `name` varchar(100) default NULL,
  `tele_num` varchar(20) default NULL,
  `context` text,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `telephone_table` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
