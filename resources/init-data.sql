/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


/*!40000 ALTER TABLE `dimension` DISABLE KEYS */;
INSERT IGNORE INTO `dimension` (`id`, `dichotomy`, `description`) VALUES
	(1, 'EI', '0: Extrovert, 1: Introvert'),
	(2, 'SN', '0: Sensing, 1: Intuitive'),
	(3, 'TF', '0: Thinking, 1: Feeling'),
	(4, 'JP', '0: Judging, 1: Perceiving');
/*!40000 ALTER TABLE `dimension` ENABLE KEYS */;

/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT IGNORE INTO `question` (`id`, `text`, `dimension`, `direction`) VALUES
	(1, 'You find it takes effort to introduce yourself to other people.', 'EI', b'1'),
	(2, 'You consider yourself more practical than creative.', 'SN', b'0'),
	(3, 'Winning a debate matters less to you than making sure no one gets upset.', 'TF', b'1'),
	(4, 'You get energized going to social events that involve many interactions.', 'EI', b'0'),
	(5, 'You often spend time exploring unrealistic and impractical yet intriguing ideas.', 'SN', b'1'),
	(6, 'Deadlines seem to you to be of relative rather than absolute importance.', 'JP', b'1'),
	(7, 'Logic is usually more important than heart when it comes to making important decisions.', 'TF', b'0'),
	(8, 'Your home and work environments are quite tidy.', 'JP', b'0'),
	(9, 'You do not mind being at the center of attention.', 'EI', b'0'),
	(10, 'Keeping your options open is more important than having a to-do list.', 'JP', b'1');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;


/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
