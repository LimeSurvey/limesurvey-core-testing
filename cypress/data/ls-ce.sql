-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: ls-dev-mysql:3306
-- Generation Time: May 12, 2023 at 02:06 PM
-- Server version: 5.7.39
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ls-ce`
--

--
-- Dumping data for table `lime_answers`
--

INSERT INTO `lime_answers` (`aid`, `qid`, `code`, `sortorder`, `assessment_value`, `scale_id`) VALUES
(17, 28, 'AO01', 0, 0, 0),
(18, 28, 'AO02', 1, 0, 0),
(19, 34, 'AO01', 0, 0, 0),
(20, 34, 'AO02', 1, 0, 0),
(21, 34, 'AO03', 2, 0, 0);

--
-- Dumping data for table `lime_answer_l10ns`
--

INSERT INTO `lime_answer_l10ns` (`id`, `aid`, `answer`, `language`) VALUES
(17, 17, '<img alt=\"\" src=\"upload/surveys/841748/images/fire.png\" style=\"width: 200px; height: 120px;\" />', 'en'),
(18, 18, '<img alt=\"\" src=\"upload/surveys/841748/images/leaves.png\" style=\"width: 200px; height: 120px;\" />', 'en'),
(19, 19, 'Second', 'en'),
(20, 20, 'Third', 'en'),
(21, 21, 'First', 'en');

--
-- Dumping data for table `lime_boxes`
--

INSERT INTO `lime_boxes` (`id`, `position`, `url`, `title`, `buttontext`, `ico`, `desc`, `page`, `usergroup`) VALUES
(1, 1, 'surveyAdministration/newSurvey', 'Create survey', 'Create survey', 'ri-add-line', 'Create a new survey from scratch. Or simply copy or import an existing survey.', 'welcome', -2),
(2, 2, 'surveyAdministration/listsurveys', 'List surveys', NULL, 'ri-list-unordered', 'List available surveys', 'welcome', -1),
(3, 3, 'admin/globalsettings', 'Global settings', 'View global settings', 'ri-settings-5-line', 'Edit global settings', 'welcome', -2),
(4, 4, 'userManagement/index', 'Manage survey administrators', 'Manage administrators', 'ri-user-line', 'The user management allows you to add additional users to your survey site.', 'welcome', -2),
(5, 5, 'admin/labels/sa/view', 'Label sets', 'Edit label sets', 'ri-price-tag-3-line', 'Label sets can be used as answer options or subquestions to speed up creation of similar questions.', 'welcome', -2),
(6, 6, 'themeOptions', 'Themes', 'Edit themes', 'ri-brush-line', 'The themes functionality allows you to edit survey-, admin- or question themes.', 'welcome', -2);

--
-- Dumping data for table `lime_groups`
--

INSERT INTO `lime_groups` (`gid`, `sid`, `group_order`, `randomization_group`, `grelevance`) VALUES
(1, 369829, 1, '', '1'),
(3, 841748, 1, '', '1'),
(4, 841748, 2, '', ''),
(5, 947781, 1, '', '1'),
(6, 947781, 2, '', ''),
(7, 947781, 3, '', ''),
(8, 282638, 1, '', '1');

--
-- Dumping data for table `lime_group_l10ns`
--

INSERT INTO `lime_group_l10ns` (`id`, `gid`, `group_name`, `description`, `language`) VALUES
(1, 1, 'My first question group', NULL, 'en'),
(3, 3, 'Favorite Colors', '<p style=\"text-align: center;\">Welcome!</p>\r\n\r\n<p style=\"text-align: center;\"><img alt=\"\" src=\"/upload/surveys/841748/images/fire.png\" /></p>\r\n', 'en'),
(4, 4, 'Colors in pictures', '', 'en'),
(5, 5, 'My first question group', NULL, 'en'),
(6, 6, 'Second group', '', 'en'),
(7, 7, 'Third group', '', 'en'),
(8, 8, 'My first question group', NULL, 'en');

--
-- Dumping data for table `lime_notifications`
--

INSERT INTO `lime_notifications` (`id`, `entity`, `entity_id`, `title`, `message`, `status`, `importance`, `display_class`, `hash`, `created`, `first_read`) VALUES
(1, 'user', 1, 'Password warning', '<span class=\"ri-error-warning-fill\"></span>&nbsp;Warning: You are still using the default password (&#039;password&#039;). Please change your password and re-login again.', 'new', 1, 'default', '9e338c35dcb45760bc8bd6d4a9a134f991580edaf0203f158510d2e817e48331', '2023-04-28 12:22:35', '2023-05-08 14:08:05'),
(2, 'user', 1, 'SSL not enforced', '<span class=\"ri-error-warning-fill\"></span>&nbsp;Warning: Please enforce SSL encryption in Global settings/Security after SSL is properly configured for your webserver.', 'new', 1, 'default', 'e874527c8f54934f3f3f6078ca5b9399c7cca002dc8398e92fcd20628c3e51bb', '2023-04-28 12:22:35', '2023-05-08 14:08:02'),
(3, 'user', 1, 'Database update', 'The database has been updated from version 605 to version 606.', 'read', 1, 'default', NULL, '2023-05-08 14:07:29', '2023-05-08 14:07:58');

--
-- Dumping data for table `lime_participant_attribute_names`
--

INSERT INTO `lime_participant_attribute_names` (`attribute_id`, `attribute_type`, `defaultname`, `visible`, `encrypted`, `core_attribute`) VALUES
(1, 'TB', 'firstname', 'TRUE', 'Y', 'Y'),
(2, 'TB', 'lastname', 'TRUE', 'Y', 'Y'),
(3, 'TB', 'email', 'TRUE', 'Y', 'Y');

--
-- Dumping data for table `lime_permissions`
--

INSERT INTO `lime_permissions` (`id`, `entity`, `entity_id`, `uid`, `permission`, `create_p`, `read_p`, `update_p`, `delete_p`, `import_p`, `export_p`) VALUES
(1, 'global', 0, 1, 'superadmin', 0, 1, 0, 0, 0, 0),
(2, 'survey', 369829, 1, 'assessments', 1, 1, 1, 1, 0, 0),
(3, 'survey', 369829, 1, 'quotas', 1, 1, 1, 1, 0, 0),
(4, 'survey', 369829, 1, 'responses', 1, 1, 1, 1, 1, 1),
(5, 'survey', 369829, 1, 'statistics', 0, 1, 0, 0, 0, 0),
(6, 'survey', 369829, 1, 'survey', 0, 1, 0, 1, 0, 0),
(7, 'survey', 369829, 1, 'surveyactivation', 0, 0, 1, 0, 0, 0),
(8, 'survey', 369829, 1, 'surveycontent', 1, 1, 1, 1, 1, 1),
(9, 'survey', 369829, 1, 'surveylocale', 0, 1, 1, 0, 0, 0),
(10, 'survey', 369829, 1, 'surveysecurity', 1, 1, 1, 1, 0, 0),
(11, 'survey', 369829, 1, 'surveysettings', 0, 1, 1, 0, 0, 0),
(12, 'survey', 369829, 1, 'tokens', 1, 1, 1, 1, 1, 1),
(13, 'survey', 369829, 1, 'translations', 0, 1, 1, 0, 0, 0),
(33, 'survey', 841748, 1, 'surveylocale', 0, 1, 1, 0, 0, 0),
(32, 'survey', 841748, 1, 'surveycontent', 1, 1, 1, 1, 1, 1),
(31, 'survey', 841748, 1, 'surveyactivation', 0, 0, 1, 0, 0, 0),
(30, 'survey', 841748, 1, 'survey', 0, 1, 0, 1, 0, 0),
(29, 'survey', 841748, 1, 'statistics', 0, 1, 0, 0, 0, 0),
(28, 'survey', 841748, 1, 'responses', 1, 1, 1, 1, 1, 1),
(27, 'survey', 841748, 1, 'quotas', 1, 1, 1, 1, 0, 0),
(26, 'survey', 841748, 1, 'assessments', 1, 1, 1, 1, 0, 0),
(34, 'survey', 841748, 1, 'surveysecurity', 1, 1, 1, 1, 0, 0),
(35, 'survey', 841748, 1, 'surveysettings', 0, 1, 1, 0, 0, 0),
(36, 'survey', 841748, 1, 'tokens', 1, 1, 1, 1, 1, 1),
(37, 'survey', 841748, 1, 'translations', 0, 1, 1, 0, 0, 0),
(38, 'global', 0, 2, 'auth_db', 0, 1, 0, 0, 0, 0),
(39, 'template', 0, 2, 'fruity', 0, 1, 0, 0, 0, 0),
(41, 'survey', 841748, 2, 'assessments', 1, 0, 0, 0, 0, 0),
(42, 'survey', 841748, 2, 'quotas', 1, 1, 1, 1, 0, 0),
(43, 'survey', 841748, 2, 'responses', 0, 1, 1, 1, 0, 0),
(44, 'survey', 841748, 2, 'statistics', 0, 0, 0, 0, 0, 0),
(45, 'survey', 841748, 2, 'survey', 0, 1, 0, 0, 0, 0),
(46, 'survey', 841748, 2, 'surveyactivation', 0, 0, 0, 0, 0, 0),
(47, 'survey', 841748, 2, 'surveycontent', 0, 0, 0, 0, 0, 0),
(48, 'survey', 841748, 2, 'surveylocale', 0, 0, 0, 0, 0, 0),
(49, 'survey', 841748, 2, 'surveysecurity', 0, 0, 0, 0, 0, 0),
(50, 'survey', 841748, 2, 'surveysettings', 0, 0, 0, 0, 0, 0),
(51, 'survey', 841748, 2, 'tokens', 0, 0, 0, 0, 0, 0),
(52, 'survey', 841748, 2, 'translations', 0, 0, 0, 0, 0, 0),
(53, 'survey', 947781, 1, 'assessments', 1, 1, 1, 1, 0, 0),
(54, 'survey', 947781, 1, 'quotas', 1, 1, 1, 1, 0, 0),
(55, 'survey', 947781, 1, 'responses', 1, 1, 1, 1, 1, 1),
(56, 'survey', 947781, 1, 'statistics', 0, 1, 0, 0, 0, 0),
(57, 'survey', 947781, 1, 'survey', 0, 1, 0, 1, 0, 0),
(58, 'survey', 947781, 1, 'surveyactivation', 0, 0, 1, 0, 0, 0),
(59, 'survey', 947781, 1, 'surveycontent', 1, 1, 1, 1, 1, 1),
(60, 'survey', 947781, 1, 'surveylocale', 0, 1, 1, 0, 0, 0),
(61, 'survey', 947781, 1, 'surveysecurity', 1, 1, 1, 1, 0, 0),
(62, 'survey', 947781, 1, 'surveysettings', 0, 1, 1, 0, 0, 0),
(63, 'survey', 947781, 1, 'tokens', 1, 1, 1, 1, 1, 1),
(64, 'survey', 947781, 1, 'translations', 0, 1, 1, 0, 0, 0),
(65, 'survey', 282638, 1, 'assessments', 1, 1, 1, 1, 0, 0),
(66, 'survey', 282638, 1, 'quotas', 1, 1, 1, 1, 0, 0),
(67, 'survey', 282638, 1, 'responses', 1, 1, 1, 1, 1, 1),
(68, 'survey', 282638, 1, 'statistics', 0, 1, 0, 0, 0, 0),
(69, 'survey', 282638, 1, 'survey', 0, 1, 0, 1, 0, 0),
(70, 'survey', 282638, 1, 'surveyactivation', 0, 0, 1, 0, 0, 0),
(71, 'survey', 282638, 1, 'surveycontent', 1, 1, 1, 1, 1, 1),
(72, 'survey', 282638, 1, 'surveylocale', 0, 1, 1, 0, 0, 0),
(73, 'survey', 282638, 1, 'surveysecurity', 1, 1, 1, 1, 0, 0),
(74, 'survey', 282638, 1, 'surveysettings', 0, 1, 1, 0, 0, 0),
(75, 'survey', 282638, 1, 'tokens', 1, 1, 1, 1, 1, 1),
(76, 'survey', 282638, 1, 'translations', 0, 1, 1, 0, 0, 0);

--
-- Dumping data for table `lime_plugins`
--

INSERT INTO `lime_plugins` (`id`, `name`, `plugin_type`, `active`, `priority`, `version`, `load_error`, `load_error_message`) VALUES
(1, 'UpdateCheck', 'core', 1, 0, '1.0.0', 0, NULL),
(2, 'PasswordRequirement', 'core', 1, 0, '1.1.0', 0, NULL),
(3, 'ComfortUpdateChecker', 'core', 1, 0, '1.0.0', 0, NULL),
(4, 'Authdb', 'core', 1, 0, '1.0.0', 0, NULL),
(5, 'AuthLDAP', 'core', 0, 0, '1.0.0', 0, NULL),
(6, 'AuditLog', 'core', 0, 0, '1.0.0', 0, NULL),
(7, 'Authwebserver', 'core', 0, 0, '1.0.0', 0, NULL),
(8, 'ExportR', 'core', 1, 0, '1.0.0', 0, NULL),
(9, 'ExportSTATAxml', 'core', 1, 0, '1.0.0', 0, NULL),
(10, 'ExportSPSSsav', 'core', 1, 0, '1.0.4', 0, NULL),
(11, 'oldUrlCompat', 'core', 0, 0, '1.0.1', 0, NULL),
(12, 'expressionQuestionHelp', 'core', 0, 0, '1.0.1', 0, NULL),
(13, 'expressionQuestionForAll', 'core', 0, 0, '1.0.1', 0, NULL),
(14, 'expressionFixedDbVar', 'core', 0, 0, '1.0.2', 0, NULL),
(15, 'customToken', 'core', 0, 0, '1.0.1', 0, NULL),
(16, 'mailSenderToFrom', 'core', 0, 0, '1.0.0', 0, NULL),
(17, 'TwoFactorAdminLogin', 'core', 0, 0, '1.2.5', 0, NULL);

--
-- Dumping data for table `lime_plugin_settings`
--

INSERT INTO `lime_plugin_settings` (`id`, `plugin_id`, `model`, `model_id`, `key`, `value`) VALUES
(1, 1, NULL, NULL, 'next_extension_update_check', '\"2023-05-09 14:07:49\"');

--
-- Dumping data for table `lime_questions`
--

INSERT INTO `lime_questions` (`qid`, `parent_qid`, `sid`, `gid`, `type`, `title`, `preg`, `other`, `mandatory`, `encrypted`, `question_order`, `scale_id`, `same_default`, `relevance`, `question_theme_name`, `modulename`, `same_script`) VALUES
(1, 0, 369829, 1, 'T', 'Q00', NULL, 'N', 'N', 'N', 1, 0, 0, '1', 'longfreetext', NULL, 0),
(3, 0, 841748, 3, 'M', 'Q00', NULL, 'N', 'Y', 'N', 1, 0, 0, '1', 'multiplechoice', NULL, 0),
(25, 3, 841748, 3, 'T', 'SQ011', NULL, 'N', NULL, 'N', 10, 0, 0, '1', 'longfreetext', NULL, 0),
(24, 3, 841748, 3, 'T', 'SQ010', NULL, 'N', NULL, 'N', 9, 0, 0, '1', 'longfreetext', NULL, 0),
(23, 3, 841748, 3, 'T', 'SQ009', NULL, 'N', NULL, 'N', 8, 0, 0, '1', 'longfreetext', NULL, 0),
(22, 3, 841748, 3, 'T', 'SQ008', NULL, 'N', NULL, 'N', 7, 0, 0, '1', 'longfreetext', NULL, 0),
(21, 3, 841748, 3, 'T', 'SQ007', NULL, 'N', NULL, 'N', 6, 0, 0, '1', 'longfreetext', NULL, 0),
(20, 3, 841748, 3, 'T', 'SQ006', NULL, 'N', NULL, 'N', 5, 0, 0, '1', 'longfreetext', NULL, 0),
(19, 3, 841748, 3, 'T', 'SQ005', NULL, 'N', NULL, 'N', 4, 0, 0, '1', 'longfreetext', NULL, 0),
(18, 3, 841748, 3, 'T', 'SQ004', NULL, 'N', NULL, 'N', 3, 0, 0, '1', 'longfreetext', NULL, 0),
(17, 3, 841748, 3, 'T', 'SQ003', NULL, 'N', NULL, 'N', 2, 0, 0, '1', 'longfreetext', NULL, 0),
(16, 3, 841748, 3, 'T', 'SQ002', NULL, 'N', NULL, 'N', 1, 0, 0, '1', 'longfreetext', NULL, 0),
(15, 3, 841748, 3, 'T', 'SQ001', NULL, 'N', NULL, 'N', 0, 0, 0, '1', 'longfreetext', NULL, 0),
(26, 0, 841748, 3, 'T', 'G01Q02', '', 'N', 'N', 'N', 2, 0, 0, '((Q00_SQ009.NAOK == \"Y\") and (Q00_SQ011.NAOK == \"Y\"))', 'longfreetext', '', 0),
(27, 0, 841748, 3, 'T', 'G01Q03', '', 'N', 'N', 'N', 3, 0, 0, '((Q00_SQ001.NAOK == \"Y\") and (Q00_SQ002.NAOK == \"Y\"))', 'longfreetext', '', 0),
(28, 0, 841748, 4, 'L', 'G02Q04', NULL, 'N', 'N', 'N', 1, 0, 0, '1', 'listradio', '', 0),
(29, 0, 947781, 5, 'T', 'Q00', NULL, 'N', 'N', 'N', 1, 0, 0, '1', 'longfreetext', NULL, 0),
(30, 0, 947781, 5, 'T', 'G01Q02', '', 'N', 'N', 'N', 2, 0, 0, '1', 'longfreetext', '', 0),
(31, 0, 947781, 5, 'T', 'G01Q03', '', 'N', 'N', 'N', 3, 0, 0, '1', 'longfreetext', '', 0),
(32, 0, 947781, 6, 'T', 'G02Q04', '', 'N', 'N', 'N', 1, 0, 0, '1', 'longfreetext', '', 0),
(33, 0, 947781, 6, 'T', 'G02Q05', '', 'N', 'N', 'N', 2, 0, 0, '1', 'longfreetext', '', 0),
(34, 0, 282638, 8, 'R', 'Q00', NULL, 'N', 'N', 'N', 1, 0, 0, '1', 'ranking', NULL, 0);

--
-- Dumping data for table `lime_question_attributes`
--

INSERT INTO `lime_question_attributes` (`qaid`, `qid`, `attribute`, `value`, `language`) VALUES
(3, 3, 'min_answers', '2', ''),
(4, 3, 'max_answers', '', ''),
(5, 3, 'array_filter_exclude', '', ''),
(6, 3, 'array_filter_style', '0', ''),
(7, 3, 'assessment_value', '1', ''),
(8, 3, 'other_numbers_only', '0', ''),
(9, 3, 'array_filter', '', ''),
(10, 3, 'exclude_all_others', '', ''),
(11, 3, 'exclude_all_others_auto', '0', ''),
(12, 3, 'random_group', '', ''),
(13, 3, 'em_validation_q', '', ''),
(14, 3, 'em_validation_q_tip', '', 'en'),
(15, 3, 'other_replace_text', '', 'en'),
(16, 3, 'display_columns', '2', ''),
(17, 3, 'hide_tip', '0', ''),
(18, 3, 'random_order', '0', ''),
(19, 3, 'hidden', '0', ''),
(20, 3, 'cssclass', '', ''),
(21, 3, 'other_position', 'end', ''),
(22, 3, 'other_position_code', '', ''),
(23, 3, 'printable_help', '', 'en'),
(24, 3, 'page_break', '0', ''),
(25, 3, 'scale_export', '0', ''),
(26, 3, 'public_statistics', '0', ''),
(27, 3, 'statistics_showgraph', '1', ''),
(28, 3, 'statistics_graphtype', '0', ''),
(29, 3, 'save_as_default', 'N', ''),
(30, 26, 'random_group', '', ''),
(31, 26, 'em_validation_q', '', ''),
(32, 26, 'em_validation_q_tip', '', 'en'),
(33, 26, 'hide_tip', '0', ''),
(34, 26, 'text_input_width', '', ''),
(35, 26, 'input_size', '', ''),
(36, 26, 'display_rows', '', ''),
(37, 26, 'hidden', '0', ''),
(38, 26, 'cssclass', '', ''),
(39, 26, 'maximum_chars', '', ''),
(40, 26, 'page_break', '0', ''),
(41, 26, 'time_limit', '', ''),
(42, 26, 'time_limit_action', '1', ''),
(43, 26, 'time_limit_disable_next', '0', ''),
(44, 26, 'time_limit_disable_prev', '0', ''),
(45, 26, 'time_limit_countdown_message', '', 'en'),
(46, 26, 'time_limit_timer_style', '', ''),
(47, 26, 'time_limit_message_delay', '', ''),
(48, 26, 'time_limit_message', '', 'en'),
(49, 26, 'time_limit_message_style', '', ''),
(50, 26, 'time_limit_warning', '', ''),
(51, 26, 'time_limit_warning_display_time', '', ''),
(52, 26, 'time_limit_warning_message', '', 'en'),
(53, 26, 'time_limit_warning_style', '', ''),
(54, 26, 'time_limit_warning_2', '', ''),
(55, 26, 'time_limit_warning_2_display_time', '', ''),
(56, 26, 'time_limit_warning_2_message', '', 'en'),
(57, 26, 'time_limit_warning_2_style', '', ''),
(58, 26, 'statistics_showgraph', '1', ''),
(59, 26, 'statistics_graphtype', '0', ''),
(60, 26, 'save_as_default', 'N', ''),
(61, 27, 'random_group', '', ''),
(62, 27, 'em_validation_q', '', ''),
(63, 27, 'em_validation_q_tip', '', 'en'),
(64, 27, 'hide_tip', '0', ''),
(65, 27, 'text_input_width', '', ''),
(66, 27, 'input_size', '', ''),
(67, 27, 'display_rows', '', ''),
(68, 27, 'hidden', '0', ''),
(69, 27, 'cssclass', '', ''),
(70, 27, 'maximum_chars', '', ''),
(71, 27, 'page_break', '0', ''),
(72, 27, 'time_limit', '', ''),
(73, 27, 'time_limit_action', '1', ''),
(74, 27, 'time_limit_disable_next', '0', ''),
(75, 27, 'time_limit_disable_prev', '0', ''),
(76, 27, 'time_limit_countdown_message', '', 'en'),
(77, 27, 'time_limit_timer_style', '', ''),
(78, 27, 'time_limit_message_delay', '', ''),
(79, 27, 'time_limit_message', '', 'en'),
(80, 27, 'time_limit_message_style', '', ''),
(81, 27, 'time_limit_warning', '', ''),
(82, 27, 'time_limit_warning_display_time', '', ''),
(83, 27, 'time_limit_warning_message', '', 'en'),
(84, 27, 'time_limit_warning_style', '', ''),
(85, 27, 'time_limit_warning_2', '', ''),
(86, 27, 'time_limit_warning_2_display_time', '', ''),
(87, 27, 'time_limit_warning_2_message', '', 'en'),
(88, 27, 'time_limit_warning_2_style', '', ''),
(89, 27, 'statistics_showgraph', '1', ''),
(90, 27, 'statistics_graphtype', '0', ''),
(91, 27, 'save_as_default', 'N', ''),
(92, 28, 'array_filter_exclude', '', ''),
(93, 28, 'array_filter', '', ''),
(94, 28, 'other_comment_mandatory', '0', ''),
(95, 28, 'other_numbers_only', '0', ''),
(96, 28, 'array_filter_style', '0', ''),
(97, 28, 'random_group', '', ''),
(98, 28, 'em_validation_q', '', ''),
(99, 28, 'em_validation_q_tip', '', 'en'),
(100, 28, 'other_replace_text', '', 'en'),
(101, 28, 'answer_order', 'normal', ''),
(102, 28, 'display_columns', '', ''),
(103, 28, 'hide_tip', '0', ''),
(104, 28, 'hidden', '0', ''),
(105, 28, 'cssclass', '', ''),
(106, 28, 'other_position', 'default', ''),
(107, 28, 'other_position_code', '', ''),
(108, 28, 'printable_help', '', 'en'),
(109, 28, 'page_break', '0', ''),
(110, 28, 'scale_export', '0', ''),
(111, 28, 'time_limit', '', ''),
(112, 28, 'time_limit_action', '1', ''),
(113, 28, 'time_limit_disable_next', '0', ''),
(114, 28, 'time_limit_disable_prev', '0', ''),
(115, 28, 'time_limit_countdown_message', '', 'en'),
(116, 28, 'time_limit_timer_style', '', ''),
(117, 28, 'time_limit_message_delay', '', ''),
(118, 28, 'time_limit_message', '', 'en'),
(119, 28, 'time_limit_message_style', '', ''),
(120, 28, 'time_limit_warning', '', ''),
(121, 28, 'time_limit_warning_display_time', '', ''),
(122, 28, 'time_limit_warning_message', '', 'en'),
(123, 28, 'time_limit_warning_style', '', ''),
(124, 28, 'time_limit_warning_2', '', ''),
(125, 28, 'time_limit_warning_2_display_time', '', ''),
(126, 28, 'time_limit_warning_2_message', '', 'en'),
(127, 28, 'time_limit_warning_2_style', '', ''),
(128, 28, 'public_statistics', '0', ''),
(129, 28, 'statistics_showgraph', '1', ''),
(130, 28, 'statistics_graphtype', '0', ''),
(131, 28, 'save_as_default', 'N', ''),
(132, 30, 'random_group', '', ''),
(133, 30, 'em_validation_q', '', ''),
(134, 30, 'em_validation_q_tip', '', 'en'),
(135, 30, 'hide_tip', '0', ''),
(136, 30, 'text_input_width', '', ''),
(137, 30, 'input_size', '', ''),
(138, 30, 'display_rows', '', ''),
(139, 30, 'hidden', '0', ''),
(140, 30, 'cssclass', '', ''),
(141, 30, 'maximum_chars', '', ''),
(142, 30, 'page_break', '0', ''),
(143, 30, 'time_limit', '', ''),
(144, 30, 'time_limit_action', '1', ''),
(145, 30, 'time_limit_disable_next', '0', ''),
(146, 30, 'time_limit_disable_prev', '0', ''),
(147, 30, 'time_limit_countdown_message', '', 'en'),
(148, 30, 'time_limit_timer_style', '', ''),
(149, 30, 'time_limit_message_delay', '', ''),
(150, 30, 'time_limit_message', '', 'en'),
(151, 30, 'time_limit_message_style', '', ''),
(152, 30, 'time_limit_warning', '', ''),
(153, 30, 'time_limit_warning_display_time', '', ''),
(154, 30, 'time_limit_warning_message', '', 'en'),
(155, 30, 'time_limit_warning_style', '', ''),
(156, 30, 'time_limit_warning_2', '', ''),
(157, 30, 'time_limit_warning_2_display_time', '', ''),
(158, 30, 'time_limit_warning_2_message', '', 'en'),
(159, 30, 'time_limit_warning_2_style', '', ''),
(160, 30, 'statistics_showgraph', '1', ''),
(161, 30, 'statistics_graphtype', '0', ''),
(162, 30, 'save_as_default', 'N', ''),
(163, 31, 'random_group', '', ''),
(164, 31, 'em_validation_q', '', ''),
(165, 31, 'em_validation_q_tip', '', 'en'),
(166, 31, 'hide_tip', '0', ''),
(167, 31, 'text_input_width', '', ''),
(168, 31, 'input_size', '', ''),
(169, 31, 'display_rows', '', ''),
(170, 31, 'hidden', '0', ''),
(171, 31, 'cssclass', '', ''),
(172, 31, 'maximum_chars', '', ''),
(173, 31, 'page_break', '0', ''),
(174, 31, 'time_limit', '', ''),
(175, 31, 'time_limit_action', '1', ''),
(176, 31, 'time_limit_disable_next', '0', ''),
(177, 31, 'time_limit_disable_prev', '0', ''),
(178, 31, 'time_limit_countdown_message', '', 'en'),
(179, 31, 'time_limit_timer_style', '', ''),
(180, 31, 'time_limit_message_delay', '', ''),
(181, 31, 'time_limit_message', '', 'en'),
(182, 31, 'time_limit_message_style', '', ''),
(183, 31, 'time_limit_warning', '', ''),
(184, 31, 'time_limit_warning_display_time', '', ''),
(185, 31, 'time_limit_warning_message', '', 'en'),
(186, 31, 'time_limit_warning_style', '', ''),
(187, 31, 'time_limit_warning_2', '', ''),
(188, 31, 'time_limit_warning_2_display_time', '', ''),
(189, 31, 'time_limit_warning_2_message', '', 'en'),
(190, 31, 'time_limit_warning_2_style', '', ''),
(191, 31, 'statistics_showgraph', '1', ''),
(192, 31, 'statistics_graphtype', '0', ''),
(193, 31, 'save_as_default', 'N', ''),
(194, 32, 'random_group', '', ''),
(195, 32, 'em_validation_q', '', ''),
(196, 32, 'em_validation_q_tip', '', 'en'),
(197, 32, 'hide_tip', '0', ''),
(198, 32, 'text_input_width', '', ''),
(199, 32, 'input_size', '', ''),
(200, 32, 'display_rows', '', ''),
(201, 32, 'hidden', '0', ''),
(202, 32, 'cssclass', '', ''),
(203, 32, 'maximum_chars', '', ''),
(204, 32, 'page_break', '0', ''),
(205, 32, 'time_limit', '', ''),
(206, 32, 'time_limit_action', '1', ''),
(207, 32, 'time_limit_disable_next', '0', ''),
(208, 32, 'time_limit_disable_prev', '0', ''),
(209, 32, 'time_limit_countdown_message', '', 'en'),
(210, 32, 'time_limit_timer_style', '', ''),
(211, 32, 'time_limit_message_delay', '', ''),
(212, 32, 'time_limit_message', '', 'en'),
(213, 32, 'time_limit_message_style', '', ''),
(214, 32, 'time_limit_warning', '', ''),
(215, 32, 'time_limit_warning_display_time', '', ''),
(216, 32, 'time_limit_warning_message', '', 'en'),
(217, 32, 'time_limit_warning_style', '', ''),
(218, 32, 'time_limit_warning_2', '', ''),
(219, 32, 'time_limit_warning_2_display_time', '', ''),
(220, 32, 'time_limit_warning_2_message', '', 'en'),
(221, 32, 'time_limit_warning_2_style', '', ''),
(222, 32, 'statistics_showgraph', '1', ''),
(223, 32, 'statistics_graphtype', '0', ''),
(224, 32, 'save_as_default', 'N', ''),
(225, 33, 'random_group', '', ''),
(226, 33, 'em_validation_q', '', ''),
(227, 33, 'em_validation_q_tip', '', 'en'),
(228, 33, 'hide_tip', '0', ''),
(229, 33, 'text_input_width', '', ''),
(230, 33, 'input_size', '', ''),
(231, 33, 'display_rows', '', ''),
(232, 33, 'hidden', '0', ''),
(233, 33, 'cssclass', '', ''),
(234, 33, 'maximum_chars', '', ''),
(235, 33, 'page_break', '0', ''),
(236, 33, 'time_limit', '', ''),
(237, 33, 'time_limit_action', '1', ''),
(238, 33, 'time_limit_disable_next', '0', ''),
(239, 33, 'time_limit_disable_prev', '0', ''),
(240, 33, 'time_limit_countdown_message', '', 'en'),
(241, 33, 'time_limit_timer_style', '', ''),
(242, 33, 'time_limit_message_delay', '', ''),
(243, 33, 'time_limit_message', '', 'en'),
(244, 33, 'time_limit_message_style', '', ''),
(245, 33, 'time_limit_warning', '', ''),
(246, 33, 'time_limit_warning_display_time', '', ''),
(247, 33, 'time_limit_warning_message', '', 'en'),
(248, 33, 'time_limit_warning_style', '', ''),
(249, 33, 'time_limit_warning_2', '', ''),
(250, 33, 'time_limit_warning_2_display_time', '', ''),
(251, 33, 'time_limit_warning_2_message', '', 'en'),
(252, 33, 'time_limit_warning_2_style', '', ''),
(253, 33, 'statistics_showgraph', '1', ''),
(254, 33, 'statistics_graphtype', '0', ''),
(255, 33, 'save_as_default', 'N', ''),
(256, 34, 'answer_order', 'normal', ''),
(257, 34, 'array_filter', '', ''),
(258, 34, 'array_filter_exclude', '', ''),
(259, 34, 'array_filter_style', '0', ''),
(260, 34, 'choice_title', '', 'en'),
(261, 34, 'cssclass', '', ''),
(262, 34, 'em_validation_q', '', ''),
(263, 34, 'em_validation_q_tip', '', 'en'),
(264, 34, 'hidden', '0', ''),
(265, 34, 'hide_tip', '0', ''),
(266, 34, 'max_answers', '', ''),
(267, 34, 'max_subquestions', '', ''),
(268, 34, 'min_answers', '', ''),
(269, 34, 'page_break', '0', ''),
(270, 34, 'printable_help', '', 'en'),
(271, 34, 'public_statistics', '0', ''),
(272, 34, 'random_group', '', ''),
(273, 34, 'rank_title', '', 'en'),
(274, 34, 'samechoiceheight', '1', ''),
(275, 34, 'samelistheight', '1', ''),
(276, 34, 'save_as_default', 'N', ''),
(277, 34, 'showpopups', '1', ''),
(278, 34, 'statistics_graphtype', '0', ''),
(279, 34, 'statistics_showgraph', '1', '');

--
-- Dumping data for table `lime_question_l10ns`
--

INSERT INTO `lime_question_l10ns` (`id`, `qid`, `question`, `help`, `script`, `language`) VALUES
(1, 1, 'A first example question. Please answer this question:', 'This is a question help text.', NULL, 'en'),
(3, 3, 'What colors are your favorite? Pick at least two.', 'This is a question help text.', '', 'en'),
(23, 23, 'black', NULL, NULL, 'en'),
(22, 22, 'beige', NULL, NULL, 'en'),
(21, 21, 'orange', NULL, NULL, 'en'),
(20, 20, 'pink', NULL, NULL, 'en'),
(19, 19, 'purple', NULL, NULL, 'en'),
(18, 18, 'blue', NULL, NULL, 'en'),
(17, 17, 'yellow', NULL, NULL, 'en'),
(16, 16, 'green', NULL, NULL, 'en'),
(15, 15, 'red', NULL, NULL, 'en'),
(24, 24, 'white', NULL, NULL, 'en'),
(25, 25, 'brown', NULL, NULL, 'en'),
(26, 26, 'Why do you like darker colors?', '', '', 'en'),
(27, 27, 'Why do you like lighter colors?', '', '', 'en'),
(28, 28, 'Which image do you like better?', '', '', 'en'),
(29, 29, 'A first example question. Please answer this question:', 'This is a question help text.', NULL, 'en'),
(30, 30, 'First question', '', '', 'en'),
(31, 31, 'Second question', '', '', 'en'),
(32, 32, 'Fourth question', '', '', 'en'),
(33, 33, 'Fifth question', '', '', 'en'),
(34, 34, 'A first example question. Please answer this question:', 'This is a question help text.', '', 'en');

--
-- Dumping data for table `lime_question_themes`
--

INSERT INTO `lime_question_themes` (`id`, `name`, `visible`, `xml_path`, `image_path`, `title`, `creation_date`, `author`, `author_email`, `author_url`, `copyright`, `license`, `version`, `api_version`, `description`, `last_update`, `owner_id`, `theme_type`, `question_type`, `core_theme`, `extends`, `group`, `settings`) VALUES
(1, '5pointchoice', 'Y', 'application/views/survey/questions/answer/5pointchoice', '/assets/images/screenshots/5.png', '5 point choice', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', '5 point choice question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', '5', 1, '', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"choice-5-pt-radio\"}'),
(2, 'arrays/10point', 'Y', 'application/views/survey/questions/answer/arrays/10point', '/assets/images/screenshots/B.png', 'Array (10 point choice)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (10 point choice) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'B', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-10-pt\"}'),
(3, 'arrays/5point', 'Y', 'application/views/survey/questions/answer/arrays/5point', '/assets/images/screenshots/A.png', 'Array (5 point choice)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (5 point choice) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'A', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-5-pt\"}'),
(4, 'arrays/array', 'Y', 'application/views/survey/questions/answer/arrays/array', '/assets/images/screenshots/F.png', 'Array', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'F', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-flexible-row\"}'),
(5, 'arrays/column', 'Y', 'application/views/survey/questions/answer/arrays/column', '/assets/images/screenshots/H.png', 'Array by column', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array by column question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'H', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-flexible-column\"}'),
(6, 'arrays/dualscale', 'Y', 'application/views/survey/questions/answer/arrays/dualscale', '/assets/images/screenshots/1.png', 'Array dual scale', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array dual scale question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', '1', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"2\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-flexible-dual-scale\"}'),
(7, 'arrays/increasesamedecrease', 'Y', 'application/views/survey/questions/answer/arrays/increasesamedecrease', '/assets/images/screenshots/E.png', 'Array (Increase/Same/Decrease)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (Increase/Same/Decrease) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'E', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-increase-same-decrease\"}'),
(8, 'arrays/multiflexi', 'Y', 'application/views/survey/questions/answer/arrays/multiflexi', '/assets/images/screenshots/COLON.png', 'Array (Numbers)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (Numbers) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', ':', 1, '', 'Arrays', '{\"subquestions\":\"2\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-multi-flexi\"}'),
(9, 'arrays/texts', 'Y', 'application/views/survey/questions/answer/arrays/texts', '/assets/images/screenshots/;.png', 'Array (Texts)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (Texts) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', ';', 1, '', 'Arrays', '{\"subquestions\":\"2\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"array-multi-flexi-text\"}'),
(10, 'arrays/yesnouncertain', 'Y', 'application/views/survey/questions/answer/arrays/yesnouncertain', '/assets/images/screenshots/C.png', 'Array (Yes/No/Uncertain)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Array (Yes/No/Uncertain) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'C', 1, '', 'Arrays', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"array-yes-uncertain-no\"}'),
(11, 'boilerplate', 'Y', 'application/views/survey/questions/answer/boilerplate', '/assets/images/screenshots/X.png', 'Text display', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Text display question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'X', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"boilerplate\"}'),
(12, 'date', 'Y', 'application/views/survey/questions/answer/date', '/assets/images/screenshots/D.png', 'Date/Time', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Date/Time question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'D', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"date\"}'),
(13, 'equation', 'Y', 'application/views/survey/questions/answer/equation', '/assets/images/screenshots/EQUATION.png', 'Equation', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Equation question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', '*', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"equation\"}'),
(14, 'file_upload', 'Y', 'application/views/survey/questions/answer/file_upload', '/assets/images/screenshots/PIPE.png', 'File upload', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'File upload question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', '|', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"upload-files\"}'),
(15, 'gender', 'Y', 'application/views/survey/questions/answer/gender', '/assets/images/screenshots/G.png', 'Gender', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Gender question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'G', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"gender\"}'),
(16, 'hugefreetext', 'Y', 'application/views/survey/questions/answer/hugefreetext', '/assets/images/screenshots/U.png', 'Huge free text', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Huge free text question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'U', 1, '', 'Text questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"text-huge\"}'),
(17, 'language', 'Y', 'application/views/survey/questions/answer/language', '/assets/images/screenshots/I.png', 'Language switch', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Language switch question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'I', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"0\",\"assessable\":\"0\",\"class\":\"language\"}'),
(18, 'listradio', 'Y', 'application/views/survey/questions/answer/listradio', '/assets/images/screenshots/L.png', 'List (Radio)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'List (radio) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'L', 1, '', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-radio\"}'),
(19, 'list_dropdown', 'Y', 'application/views/survey/questions/answer/list_dropdown', '/assets/images/screenshots/!.png', 'List (Dropdown)', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'List (dropdown) question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', '!', 1, '', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-dropdown\"}'),
(20, 'list_with_comment', 'Y', 'application/views/survey/questions/answer/list_with_comment', '/assets/images/screenshots/O.png', 'List with comment', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'List with comment question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'O', 1, '', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-with-comment\"}'),
(21, 'longfreetext', 'Y', 'application/views/survey/questions/answer/longfreetext', '/assets/images/screenshots/T.png', 'Long free text', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Long free text question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'T', 1, '', 'Text questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"text-long\"}'),
(22, 'multiplechoice', 'Y', 'application/views/survey/questions/answer/multiplechoice', '/assets/images/screenshots/M.png', 'Multiple choice', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Multiple choice question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'M', 1, '', 'Multiple choice questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"multiple-opt\"}'),
(23, 'multiplechoice_with_comments', 'Y', 'application/views/survey/questions/answer/multiplechoice_with_comments', '/assets/images/screenshots/P.png', 'Multiple choice with comments', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Multiple choice with comments question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'P', 1, '', 'Multiple choice questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"multiple-opt-comments\"}'),
(24, 'multiplenumeric', 'Y', 'application/views/survey/questions/answer/multiplenumeric', '/assets/images/screenshots/K.png', 'Multiple numerical input', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Multiple numerical input question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'K', 1, '', 'Mask questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"numeric-multi\"}'),
(25, 'multipleshorttext', 'Y', 'application/views/survey/questions/answer/multipleshorttext', '/assets/images/screenshots/Q.png', 'Multiple short text', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Multiple short text question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'Q', 1, '', 'Text questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"multiple-short-txt\"}'),
(26, 'numerical', 'Y', 'application/views/survey/questions/answer/numerical', '/assets/images/screenshots/N.png', 'Numerical input', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Numerical input question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'N', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"numeric\"}'),
(27, 'ranking', 'Y', 'application/views/survey/questions/answer/ranking', '/assets/images/screenshots/R.png', 'Ranking', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Ranking question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'R', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"ranking\"}'),
(28, 'shortfreetext', 'Y', 'application/views/survey/questions/answer/shortfreetext', '/assets/images/screenshots/S.png', 'Short free text', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Short free text question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'S', 1, '', 'Text questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"text-short\"}'),
(29, 'yesno', 'Y', 'application/views/survey/questions/answer/yesno', '/assets/images/screenshots/Y.png', 'Yes/No', '2018-09-08 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Yes/No question type configuration', '2019-09-23 15:05:59', 1, 'question_theme', 'Y', 1, '', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"yes-no\"}'),
(30, 'bootstrap_dropdown', 'Y', 'themes/question/bootstrap_dropdown/survey/questions/answer/list_dropdown', '/themes/question/bootstrap_dropdown/survey/questions/answer/list_dropdown/assets/bootstrap_dropdown_list_dropdown.png', 'Bootstrap dropdown', '1970-01-01 01:00:00', 'Adam Zammit', 'adam.zammit@acspri.org.au', 'https://www.acspri.org.au', 'Copyright (C) 2021 The Australian Consortium for Social and Political Research Incorporated (ACSPRI)', 'GNU General Public License version 2 or later', '1.0', '1', 'Bootstrap dropdown theme', '2021-09-29 12:00:00', 1, 'question_theme', '!', 1, '!', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-dropdown\"}'),
(31, 'bootstrap_buttons', 'Y', 'themes/question/bootstrap_buttons/survey/questions/answer/listradio', '/themes/question/bootstrap_buttons/survey/questions/answer/listradio/assets/bootstrap_buttons_listradio.png', 'Bootstrap buttons', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'New implementation of the Bootstrap buttons question theme', '2019-09-23 15:05:59', 1, 'question_theme', 'L', 1, 'L', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-radio\"}'),
(32, 'bootstrap_buttons_multi', 'Y', 'themes/question/bootstrap_buttons_multi/survey/questions/answer/multiplechoice', '/themes/question/bootstrap_buttons_multi/survey/questions/answer/multiplechoice/assets/bootstrap_buttons_multiplechoice.png', 'Bootstrap buttons', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'New implementation of the Bootstrap buttons question theme', '2019-09-23 15:05:59', 1, 'question_theme', 'M', 1, 'M', 'Multiple choice questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"multiple-opt\"}'),
(33, 'browserdetect', 'Y', 'themes/question/browserdetect/survey/questions/answer/shortfreetext', '/assets/images/screenshots/S.png', 'Browser detection', '2017-07-09 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2017 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Browser, Platform and Proxy detection', '2019-09-23 15:05:59', 1, 'question_theme', 'S', 1, 'S', 'Text questions', '{\"subquestions\":\"0\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"text-short\"}'),
(34, 'image_select-listradio', 'Y', 'themes/question/image_select/survey/questions/answer/listradio', '/assets/images/screenshots/L.png', 'Image select list (Radio)', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2016 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'List Radio with images.', '2019-09-23 15:05:59', 1, 'question_theme', 'L', 1, 'L', 'Single choice questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"list-radio\"}'),
(35, 'image_select-multiplechoice', 'Y', 'themes/question/image_select/survey/questions/answer/multiplechoice', '/assets/images/screenshots/M.png', 'Image select multiple choice', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2016 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Multiplechoice with images.', '2019-09-23 15:05:59', 1, 'question_theme', 'M', 1, 'M', 'Multiple choice questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"1\",\"class\":\"multiple-opt\"}'),
(36, 'inputondemand', 'Y', 'themes/question/inputondemand/survey/questions/answer/multipleshorttext', '/assets/images/screenshots/Q.png', 'Input on demand', '2019-10-04 00:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2019 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'Hide not needed input fields in multiple shorttext', '2019-09-23 15:05:59', 1, 'question_theme', 'Q', 1, 'Q', 'Text questions', '{\"subquestions\":\"1\",\"answerscales\":\"0\",\"hasdefaultvalues\":\"1\",\"assessable\":\"0\",\"class\":\"multiple-short-txt\"}'),
(37, 'ranking_advanced', 'Y', 'themes/question/ranking_advanced/survey/questions/answer/ranking', '/assets/images/screenshots/R.png', 'Ranking advanced', '1970-01-01 01:00:00', 'LimeSurvey GmbH', 'info@limesurvey.org', 'http://www.limesurvey.org', 'Copyright (C) 2005 - 2017 LimeSurvey Gmbh, Inc. All rights reserved.', 'GNU General Public License version 2 or later', '1.0', '1', 'New implementation of the ranking question', '2019-09-23 15:05:59', 1, 'question_theme', 'R', 1, 'R', 'Mask questions', '{\"subquestions\":\"0\",\"answerscales\":\"1\",\"hasdefaultvalues\":\"0\",\"assessable\":\"1\",\"class\":\"ranking\"}');

--
-- Dumping data for table `lime_quota`
--

INSERT INTO `lime_quota` (`id`, `sid`, `name`, `qlimit`, `action`, `active`, `autoload_url`) VALUES
(1, 841748, 'dark colors', 5, 1, 1, 0);

--
-- Dumping data for table `lime_quota_languagesettings`
--

INSERT INTO `lime_quota_languagesettings` (`quotals_id`, `quotals_quota_id`, `quotals_language`, `quotals_name`, `quotals_message`, `quotals_url`, `quotals_urldescrip`) VALUES
(1, 1, 'en', NULL, 'Sorry your responses have exceeded a quota on this survey.', '', '');

--
-- Dumping data for table `lime_quota_members`
--

INSERT INTO `lime_quota_members` (`id`, `sid`, `qid`, `quota_id`, `code`) VALUES
(1, 841748, 3, 1, 'SQ009'),
(2, 841748, 3, 1, 'SQ011');

--
-- Dumping data for table `lime_settings_global`
--

INSERT INTO `lime_settings_global` (`stg_name`, `stg_value`) VALUES
('sendadmincreationemail', '1'),
('admincreationemailsubject', 'User registration at \'{SITENAME}\''),
('admincreationemailtemplate', '<p>Hello {FULLNAME}, </p><p>This is an automated email notification that a user has been created for you on the website <strong>\'{SITENAME}\'</strong>.</p><p></p><p>You can use now the following credentials to log in:</p><p><strong>Username</strong>: {USERNAME}</p><p><a href=\"{LOGINURL}\">Click here to set your password</a></p><p>If you have any questions regarding this email, please do not hesitate to contact the site administrator at {SITEADMINEMAIL}.</p><p> </p><p>Thank you!</p>'),
('DBVersion', '606'),
('SessionName', 'ARTXJGFBIBFZGHRSHBTERROSDEPMNBYIEMOTMNBIWKVYGCVTJGYXAEXELCYPJTUQ'),
('sitename', 'LimeSurvey'),
('siteadminname', 'Administrator'),
('siteadminemail', 'your-email@example.net'),
('siteadminbounce', 'your-email@example.net'),
('defaultlang', 'en'),
('AssetsVersion', '30335'),
('last_survey_1', '947781');

--
-- Dumping data for table `lime_settings_user`
--

INSERT INTO `lime_settings_user` (`id`, `uid`, `entity`, `entity_id`, `stg_name`, `stg_value`) VALUES
(1, 1, NULL, NULL, 'quickaction_state', '1'),
(2, 2, NULL, NULL, 'editorPreset', 'wysiwyg'),
(3, 2, NULL, NULL, 'showScriptEditor', '1'),
(4, 2, NULL, NULL, 'noViewMode', '0'),
(5, 2, NULL, NULL, 'answeroptionprefix', 'AO'),
(6, 2, NULL, NULL, 'subquestionprefix', 'SQ'),
(7, 2, NULL, NULL, 'lock_organizer', '0');

--
-- Dumping data for table `lime_surveymenu`
--

INSERT INTO `lime_surveymenu` (`id`, `parent_id`, `survey_id`, `user_id`, `name`, `ordering`, `level`, `title`, `position`, `description`, `showincollapse`, `active`, `changed_at`, `changed_by`, `created_at`, `created_by`) VALUES
(1, NULL, NULL, NULL, 'settings', 1, 0, 'Survey settings', 'side', 'Survey settings', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(2, NULL, NULL, NULL, 'mainmenu', 2, 0, 'Survey menu', 'side', 'Main survey menu', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(3, NULL, NULL, NULL, 'quickmenu', 3, 0, 'Quick menu', 'collapsed', 'Quick menu', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0);

--
-- Dumping data for table `lime_surveymenu_entries`
--

INSERT INTO `lime_surveymenu_entries` (`id`, `menu_id`, `user_id`, `ordering`, `name`, `title`, `menu_title`, `menu_description`, `menu_icon`, `menu_icon_type`, `menu_class`, `menu_link`, `action`, `template`, `partial`, `classes`, `permission`, `permission_grade`, `data`, `getdatamethod`, `language`, `showincollapse`, `active`, `changed_at`, `changed_by`, `created_at`, `created_by`) VALUES
(1, 1, NULL, 1, 'overview', 'Survey overview', 'Overview', 'Open the general survey overview', 'ri-bar-chart-horizontal-line', 'remix', '', 'surveyAdministration/view', '', '', '', '', '', '', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(2, 1, NULL, 2, 'generalsettings', 'General survey settings', 'General settings', 'Open general survey settings', 'ri-tools-line', 'remix', '', '', 'updatesurveylocalesettings_generalsettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_generaloptions_panel', '', 'surveysettings', 'read', NULL, 'generalTabEditSurvey', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(3, 1, NULL, 3, 'surveytexts', 'Survey text elements', 'Text elements', 'Survey text elements', 'ri-text-spacing', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/tab_edit_view', '', 'surveylocale', 'read', NULL, 'getTextEditData', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(4, 1, NULL, 4, 'datasecurity', 'Privacy policy settings', 'Privacy policy', 'Edit privacy policy settings', 'ri-shield-line', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/tab_edit_view_datasecurity', '', 'surveylocale', 'read', NULL, 'getDataSecurityEditData', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(5, 1, NULL, 5, 'theme_options', 'Theme options', 'Theme options', 'Edit theme options for this survey', 'ri-contrast-drop-fill', 'remix', '', 'themeOptions/updateSurvey', '', '', '', '', 'surveysettings', 'update', '{\"render\": {\"link\": { \"pjaxed\": true, \"data\": {\"surveyid\": [\"survey\",\"sid\"], \"gsid\":[\"survey\",\"gsid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(6, 1, NULL, 6, 'presentation', 'Presentation & navigation settings', 'Presentation', 'Edit presentation and navigation settings', 'ri-slideshow-line', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_presentation_panel', '', 'surveylocale', 'read', NULL, 'tabPresentationNavigation', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(7, 1, NULL, 7, 'tokens', 'Survey participant settings', 'Participant settings', 'Set additional options for survey participants', 'ri-body-scan-fill', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_tokens_panel', '', 'surveylocale', 'read', NULL, 'tabTokens', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(8, 1, NULL, 8, 'notification', 'Notification and data management settings', 'Notifications & data', 'Edit settings for notification and data management', 'ri-notification-line', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_notification_panel', '', 'surveylocale', 'read', NULL, 'tabNotificationDataManagement', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(9, 1, NULL, 9, 'publication', 'Publication & access control settings', 'Publication & access', 'Edit settings for publication and access control', 'ri-key-line', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_publication_panel', '', 'surveylocale', 'read', NULL, 'tabPublicationAccess', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(10, 1, NULL, 10, 'surveypermissions', 'Edit survey permissions', 'Survey permissions', 'Edit permissions for this survey', 'ri-lock-password-line', 'remix', '', 'surveyPermissions/index', '', '', '', '', 'surveysecurity', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(11, 2, NULL, 1, 'listQuestions', 'Overview question & groups', 'Overview question & groups', 'Overview question and groups', '', 'remix', '', 'questionAdministration/listQuestions', '', '', '', '', 'surveycontent', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(14, 2, NULL, 4, 'participants', 'Survey participants', 'Survey participants', 'Go to survey participant and token settings', '', 'remix', '', 'admin/tokens/sa/index/', '', '', '', '', 'tokens', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(15, 2, NULL, 5, 'emailtemplates', 'Email templates', 'Email templates', 'Edit the templates for invitation, reminder and registration emails', '', 'remix', '', 'admin/emailtemplates/sa/index/', '', '', '', '', 'surveylocale', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(16, 2, NULL, 6, 'failedemail', 'Failed email notifications', 'Failed email notifications', 'View and resend failed email notifications', '', 'remix', '', 'failedEmail/index/', '', '', '', '', 'surveylocale', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(17, 2, NULL, 7, 'quotas', 'Edit quotas', 'Quotas', 'Edit quotas for this survey.', '', 'remix', '', 'quotas/index/', '', '', '', '', 'quotas', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(18, 2, NULL, 8, 'assessments', 'Edit assessments', 'Assessments', 'Edit and look at the assessements for this survey.', '', 'remix', '', 'assessment/index', '', '', '', '', 'assessments', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(19, 2, NULL, 9, 'panelintegration', 'Edit survey panel integration', 'Panel integration', 'Define panel integrations for your survey', '', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_integration_panel', '', 'surveylocale', 'read', '{\"render\": {\"link\": { \"pjaxed\": false}}}', 'tabPanelIntegration', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(20, 2, NULL, 10, 'responses', 'Responses', 'Responses', 'Responses', '', 'remix', '', 'responses/browse/', '', '', '', '', 'responses', 'read', '{\"render\": {\"isActive\": true, \"link\": {\"data\": {\"surveyId\": [\"survey\", \"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(21, 2, NULL, 11, 'statistics', 'Statistics', 'Statistics', 'Statistics', '', 'remix', '', 'admin/statistics/sa/index/', '', '', '', '', 'statistics', 'read', '{\"render\": {\"isActive\": true, \"link\": {\"data\": {\"surveyid\": [\"survey\", \"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(22, 2, NULL, 12, 'resources', 'Add/edit resources (files/images) for this survey', 'Resources', 'Add/edit resources (files/images) for this survey', '', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_resources_panel', '', 'surveylocale', 'read', '{\"render\": { \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', 'tabResourceManagement', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(23, 2, NULL, 13, 'plugins', 'Simple plugin settings', 'Simple plugins', 'Edit simple plugin settings', '', 'remix', '', '', 'updatesurveylocalesettings', 'editLocalSettings_main_view', '/admin/survey/subview/accordion/_plugins_panel', '', 'surveysettings', 'read', '{\"render\": {\"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', 'pluginTabSurvey', 'en-GB', 0, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(24, 3, NULL, 1, 'activateSurvey', 'Activate survey', 'Activate survey', 'Activate survey', 'ri-play-fill', 'remix', '', 'surveyAdministration/activate', '', '', '', '', 'surveyactivation', 'update', '{\"render\": {\"isActive\": false, \"link\": {\"data\": {\"iSurveyID\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(25, 3, NULL, 2, 'deactivateSurvey', 'Stop survey', 'Stop survey', 'Stop this survey', 'ri-stop-fill', 'remix', '', 'surveyAdministration/deactivate', '', '', '', '', 'surveyactivation', 'update', '{\"render\": {\"isActive\": true, \"link\": {\"data\": {\"surveyid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(26, 3, NULL, 3, 'testSurvey', 'Go to survey', 'Go to survey', 'Go to survey', 'ri-settings-5-fill', 'remix', '', 'survey/index/', '', '', '', '', '', '', '{\"render\": {\"link\": {\"external\": true, \"data\": {\"sid\": [\"survey\",\"sid\"], \"newtest\": \"Y\", \"lang\": [\"survey\",\"language\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(27, 3, NULL, 4, 'surveyLogicFile', 'Survey logic file', 'Survey logic file', 'Survey logic file', 'ri-git-branch-fill', 'remix', '', 'admin/expressions/sa/survey_logic_file/', '', '', '', '', 'surveycontent', 'read', '{\"render\": { \"link\": {\"data\": {\"sid\": [\"survey\",\"sid\"]}}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0),
(28, 3, NULL, 5, 'cpdb', 'Central participant database', 'Central participant database', 'Central participant database', 'ri-group-fill', 'remix', '', 'admin/participants/sa/displayParticipants', '', '', '', '', 'tokens', 'read', '{\"render\": {\"link\": {}}}', '', 'en-GB', 1, 1, '2023-04-28 12:19:53', 0, '2023-04-28 12:19:53', 0);

--
-- Dumping data for table `lime_surveys`
--

INSERT INTO `lime_surveys` (`sid`, `owner_id`, `gsid`, `admin`, `active`, `expires`, `startdate`, `adminemail`, `anonymized`, `format`, `savetimings`, `template`, `language`, `additional_languages`, `datestamp`, `usecookie`, `allowregister`, `allowsave`, `autonumber_start`, `autoredirect`, `allowprev`, `printanswers`, `ipaddr`, `ipanonymize`, `refurl`, `datecreated`, `showsurveypolicynotice`, `publicstatistics`, `publicgraphs`, `listpublic`, `htmlemail`, `sendconfirmation`, `tokenanswerspersistence`, `assessments`, `usecaptcha`, `usetokens`, `bounce_email`, `attributedescriptions`, `emailresponseto`, `emailnotificationto`, `tokenlength`, `showxquestions`, `showgroupinfo`, `shownoanswer`, `showqnumcode`, `bouncetime`, `bounceprocessing`, `bounceaccounttype`, `bounceaccounthost`, `bounceaccountpass`, `bounceaccountencryption`, `bounceaccountuser`, `showwelcome`, `showprogress`, `questionindex`, `navigationdelay`, `nokeyboard`, `alloweditaftercompletion`, `googleanalyticsstyle`, `googleanalyticsapikey`, `tokenencryptionoptions`) VALUES
(369829, 1, 1, 'inherit', 'N', NULL, NULL, 'inherit', 'N', 'I', 'I', 'inherit', 'en', '', 'I', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'I', 'I', 'I', '2023-04-28 12:23:08', 0, 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'N', 'inherit', NULL, 'inherit', 'inherit', -1, 'I', 'I', 'I', 'I', NULL, 'N', NULL, NULL, NULL, NULL, NULL, 'I', 'I', -1, -1, 'I', 'I', NULL, NULL, ''),
(841748, 1, 1, 'inherit', 'Y', '2032-05-31 17:00:00', '2023-05-09 16:00:00', 'inherit', 'N', 'I', 'N', 'inherit', 'en', '', 'N', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'N', 'N', 'N', '2023-05-08 14:06:10', 0, 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'N', 'inherit', NULL, 'inherit', 'inherit', -1, 'I', 'I', 'I', 'I', NULL, 'N', NULL, NULL, NULL, NULL, NULL, 'I', 'I', -1, -1, 'I', 'I', '', '', '{ \"enabled\":\"Y\",\"columns\":{ \"firstname\":\"N\",\"lastname\":\"N\",\"email\":\"N\" } }'),
(947781, 1, 1, 'inherit', 'N', NULL, NULL, 'inherit', 'N', 'I', 'I', 'inherit', 'en', '', 'I', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'I', 'I', 'I', '2023-05-10 14:42:39', 0, 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'N', 'inherit', NULL, 'inherit', 'inherit', -1, 'I', 'I', 'I', 'I', NULL, 'N', NULL, NULL, NULL, NULL, NULL, 'I', 'I', -1, -1, 'I', 'I', NULL, NULL, ''),
(282638, 1, 1, 'inherit', 'N', NULL, NULL, 'inherit', 'N', 'I', 'I', 'inherit', 'en', '', 'I', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'I', 'I', 'I', '2023-05-12 14:05:12', 0, 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'N', 'inherit', NULL, 'inherit', 'inherit', -1, 'I', 'I', 'I', 'I', NULL, 'N', NULL, NULL, NULL, NULL, NULL, 'I', 'I', -1, -1, 'I', 'I', NULL, NULL, '');

--
-- Dumping data for table `lime_surveys_groups`
--

INSERT INTO `lime_surveys_groups` (`gsid`, `name`, `title`, `template`, `description`, `sortorder`, `owner_id`, `parent_id`, `alwaysavailable`, `created`, `modified`, `created_by`) VALUES
(1, 'default', 'Default', NULL, 'Default survey group', 0, 1, NULL, NULL, '2023-04-28 12:19:53', '2023-04-28 12:19:53', 1);

--
-- Dumping data for table `lime_surveys_groupsettings`
--

INSERT INTO `lime_surveys_groupsettings` (`gsid`, `owner_id`, `admin`, `adminemail`, `anonymized`, `format`, `savetimings`, `template`, `datestamp`, `usecookie`, `allowregister`, `allowsave`, `autonumber_start`, `autoredirect`, `allowprev`, `printanswers`, `ipaddr`, `ipanonymize`, `refurl`, `showsurveypolicynotice`, `publicstatistics`, `publicgraphs`, `listpublic`, `htmlemail`, `sendconfirmation`, `tokenanswerspersistence`, `assessments`, `usecaptcha`, `bounce_email`, `attributedescriptions`, `emailresponseto`, `emailnotificationto`, `tokenlength`, `showxquestions`, `showgroupinfo`, `shownoanswer`, `showqnumcode`, `showwelcome`, `showprogress`, `questionindex`, `navigationdelay`, `nokeyboard`, `alloweditaftercompletion`) VALUES
(0, 1, 'Administrator', 'your-email@example.net', 'N', 'G', 'N', 'fruity', 'N', 'N', 'N', 'Y', 0, 'N', 'N', 'N', 'N', 'N', 'N', 0, 'N', 'N', 'N', 'Y', 'Y', 'N', 'N', 'N', NULL, NULL, NULL, NULL, 15, 'Y', 'B', 'Y', 'X', 'Y', 'Y', 0, 0, 'N', 'N'),
(1, -1, 'inherit', 'inherit', 'I', 'I', 'I', 'inherit', 'I', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'I', 'I', 'I', 0, 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'inherit', NULL, 'inherit', 'inherit', -1, 'I', 'I', 'I', 'I', 'I', 'I', -1, -1, 'I', 'I');

--
-- Dumping data for table `lime_surveys_languagesettings`
--

INSERT INTO `lime_surveys_languagesettings` (`surveyls_survey_id`, `surveyls_language`, `surveyls_title`, `surveyls_description`, `surveyls_welcometext`, `surveyls_endtext`, `surveyls_policy_notice`, `surveyls_policy_error`, `surveyls_policy_notice_label`, `surveyls_url`, `surveyls_urldescription`, `surveyls_email_invite_subj`, `surveyls_email_invite`, `surveyls_email_remind_subj`, `surveyls_email_remind`, `surveyls_email_register_subj`, `surveyls_email_register`, `surveyls_email_confirm_subj`, `surveyls_email_confirm`, `surveyls_dateformat`, `surveyls_attributecaptions`, `surveyls_alias`, `email_admin_notification_subj`, `email_admin_notification`, `email_admin_responses_subj`, `email_admin_responses`, `surveyls_numberformat`, `attachments`) VALUES
(369829, 'en', 'Simple survey', '', '', '', '', NULL, '', '', '', 'Invitation to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nYou have been invited to participate in a survey.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}<br />\n<br />\nIf you are blacklisted but want to participate in this survey and want to receive invitations please click the following link:<br />\n{OPTINURL}', 'Reminder to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nRecently we invited you to participate in a survey.<br />\n<br />\nWe note that you have not yet completed the survey, and wish to remind you that the survey is still available should you wish to take part.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}', 'Survey registration confirmation', 'Dear {FIRSTNAME},<br />\n<br />\nYou, or someone using your email address, have registered to participate in an online survey titled {SURVEYNAME}.<br />\n<br />\nTo complete this survey, click on the following URL:<br />\n<br />\n{SURVEYURL}<br />\n<br />\nIf you have any questions about this survey, or if you did not register to participate and believe this email is in error, please contact {ADMINNAME} at {ADMINEMAIL}.', 'Confirmation of your participation in our survey', 'Dear {FIRSTNAME},<br />\n<br />\nThis email is to confirm that you have completed the survey titled {SURVEYNAME} and your response has been saved. Thank you for participating.<br />\n<br />\nIf you have any further questions about this email, please contact {ADMINNAME} on {ADMINEMAIL}.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME}', 9, NULL, NULL, 'Response submission for survey {SURVEYNAME}', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}', 'Response submission for survey {SURVEYNAME} with results', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}<br />\n<br />\n<br />\nThe following answers were given by the participant:<br />\n{ANSWERTABLE}', 0, NULL),
(841748, 'en', 'Colors', '', '', '', '', NULL, '', '', '', 'Invitation to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nYou have been invited to participate in a survey.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}<br />\n<br />\nIf you are blacklisted but want to participate in this survey and want to receive invitations please click the following link:<br />\n{OPTINURL}', 'Reminder to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nRecently we invited you to participate in a survey.<br />\n<br />\nWe note that you have not yet completed the survey, and wish to remind you that the survey is still available should you wish to take part.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}', 'Survey registration confirmation', 'Dear {FIRSTNAME},<br />\n<br />\nYou, or someone using your email address, have registered to participate in an online survey titled {SURVEYNAME}.<br />\n<br />\nTo complete this survey, click on the following URL:<br />\n<br />\n{SURVEYURL}<br />\n<br />\nIf you have any questions about this survey, or if you did not register to participate and believe this email is in error, please contact {ADMINNAME} at {ADMINEMAIL}.', 'Confirmation of your participation in our survey', 'Dear {FIRSTNAME},<br />\n<br />\nThis email is to confirm that you have completed the survey titled {SURVEYNAME} and your response has been saved. Thank you for participating.<br />\n<br />\nIf you have any further questions about this email, please contact {ADMINNAME} on {ADMINEMAIL}.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME}', 9, NULL, NULL, 'Response submission for survey {SURVEYNAME}', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}', 'Response submission for survey {SURVEYNAME} with results', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}<br />\n<br />\n<br />\nThe following answers were given by the participant:<br />\n{ANSWERTABLE}', 0, NULL),
(947781, 'en', 'Reorder survey', '', '', '', '', NULL, '', '', '', 'Invitation to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nYou have been invited to participate in a survey.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}<br />\n<br />\nIf you are blacklisted but want to participate in this survey and want to receive invitations please click the following link:<br />\n{OPTINURL}', 'Reminder to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nRecently we invited you to participate in a survey.<br />\n<br />\nWe note that you have not yet completed the survey, and wish to remind you that the survey is still available should you wish to take part.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}', 'Survey registration confirmation', 'Dear {FIRSTNAME},<br />\n<br />\nYou, or someone using your email address, have registered to participate in an online survey titled {SURVEYNAME}.<br />\n<br />\nTo complete this survey, click on the following URL:<br />\n<br />\n{SURVEYURL}<br />\n<br />\nIf you have any questions about this survey, or if you did not register to participate and believe this email is in error, please contact {ADMINNAME} at {ADMINEMAIL}.', 'Confirmation of your participation in our survey', 'Dear {FIRSTNAME},<br />\n<br />\nThis email is to confirm that you have completed the survey titled {SURVEYNAME} and your response has been saved. Thank you for participating.<br />\n<br />\nIf you have any further questions about this email, please contact {ADMINNAME} on {ADMINEMAIL}.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME}', 9, NULL, NULL, 'Response submission for survey {SURVEYNAME}', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}', 'Response submission for survey {SURVEYNAME} with results', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}<br />\n<br />\n<br />\nThe following answers were given by the participant:<br />\n{ANSWERTABLE}', 0, NULL),
(282638, 'en', 'Drag and drop', '', '', '', '', NULL, '', '', '', 'Invitation to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nYou have been invited to participate in a survey.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}<br />\n<br />\nIf you are blacklisted but want to participate in this survey and want to receive invitations please click the following link:<br />\n{OPTINURL}', 'Reminder to participate in a survey', 'Dear {FIRSTNAME},<br />\n<br />\nRecently we invited you to participate in a survey.<br />\n<br />\nWe note that you have not yet completed the survey, and wish to remind you that the survey is still available should you wish to take part.<br />\n<br />\nThe survey is titled:<br />\n\"{SURVEYNAME}\"<br />\n<br />\n\"{SURVEYDESCRIPTION}\"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don\'t want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}', 'Survey registration confirmation', 'Dear {FIRSTNAME},<br />\n<br />\nYou, or someone using your email address, have registered to participate in an online survey titled {SURVEYNAME}.<br />\n<br />\nTo complete this survey, click on the following URL:<br />\n<br />\n{SURVEYURL}<br />\n<br />\nIf you have any questions about this survey, or if you did not register to participate and believe this email is in error, please contact {ADMINNAME} at {ADMINEMAIL}.', 'Confirmation of your participation in our survey', 'Dear {FIRSTNAME},<br />\n<br />\nThis email is to confirm that you have completed the survey titled {SURVEYNAME} and your response has been saved. Thank you for participating.<br />\n<br />\nIf you have any further questions about this email, please contact {ADMINNAME} on {ADMINEMAIL}.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME}', 9, NULL, NULL, 'Response submission for survey {SURVEYNAME}', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}', 'Response submission for survey {SURVEYNAME} with results', 'Hello,<br />\n<br />\nA new response was submitted for your survey \'{SURVEYNAME}\'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}<br />\n<br />\n<br />\nThe following answers were given by the participant:<br />\n{ANSWERTABLE}', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lime_survey_841748`
--

CREATE TABLE `lime_survey_841748` (
  `id` int(11) NOT NULL,
  `token` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `submitdate` datetime DEFAULT NULL,
  `lastpage` int(11) DEFAULT NULL,
  `startlanguage` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `seed` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ001` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ002` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ003` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ004` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ005` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ006` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ007` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ008` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ009` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ010` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X3SQ011` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `841748X3X26` text COLLATE utf8mb4_unicode_ci,
  `841748X3X27` text COLLATE utf8mb4_unicode_ci,
  `841748X4X28` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lime_survey_841748`
--

INSERT INTO `lime_survey_841748` (`id`, `token`, `submitdate`, `lastpage`, `startlanguage`, `seed`, `841748X3X3SQ001`, `841748X3X3SQ002`, `841748X3X3SQ003`, `841748X3X3SQ004`, `841748X3X3SQ005`, `841748X3X3SQ006`, `841748X3X3SQ007`, `841748X3X3SQ008`, `841748X3X3SQ009`, `841748X3X3SQ010`, `841748X3X3SQ011`, `841748X3X26`, `841748X3X27`, `841748X4X28`) VALUES
(1, NULL, '1980-01-01 00:00:00', 2, 'en', '1484009392', '', '', '', '', '', '', '', '', 'Y', '', 'Y', 'I am a fan of heavy metal music', NULL, 'AO01'),
(2, NULL, '1980-01-01 00:00:00', 2, 'en', '1838533972', 'Y', 'Y', '', '', '', '', '', '', '', '', '', NULL, 'They brighten my day', 'AO01');

--
-- Dumping data for table `lime_templates`
--

INSERT INTO `lime_templates` (`id`, `name`, `folder`, `title`, `creation_date`, `author`, `author_email`, `author_url`, `copyright`, `license`, `version`, `api_version`, `view_folder`, `files_folder`, `description`, `last_update`, `owner_id`, `extends`) VALUES
(1, 'vanilla', 'vanilla', 'Vanilla Theme', '2023-04-28 12:19:53', 'LimeSurvey GmbH', 'info@limesurvey.org', 'https://www.limesurvey.org/', 'Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.', 'License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.', '3.0', '3.0', 'views', 'files', '<strong>LimeSurvey Bootstrap Vanilla Survey Theme</strong><br>A clean and simple base that can be used by developers to create their own Bootstrap based theme.', NULL, 1, ''),
(2, 'fruity', 'fruity', 'Fruity Theme', '2023-04-28 12:19:53', 'LimeSurvey GmbH', 'info@limesurvey.org', 'https://www.limesurvey.org/', 'Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.', 'License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.', '3.0', '3.0', 'views', 'files', '<strong>LimeSurvey Fruity Theme</strong><br>A fruity theme for a flexible use. This theme offers monochromes variations and many options for easy customizations.', NULL, 1, 'vanilla'),
(3, 'bootswatch', 'bootswatch', 'Bootswatch Theme', '2023-04-28 12:19:53', 'LimeSurvey GmbH', 'info@limesurvey.org', 'https://www.limesurvey.org/', 'Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.', 'License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.', '3.0', '3.0', 'views', 'files', '<strong>LimeSurvey Bootwatch Theme</strong><br>Based on BootsWatch Themes: <a href=\"https://bootswatch.com/3/\"\">Visit BootsWatch page</a> ', NULL, 1, 'vanilla');

--
-- Dumping data for table `lime_template_configuration`
--

INSERT INTO `lime_template_configuration` (`id`, `template_name`, `sid`, `gsid`, `uid`, `files_css`, `files_js`, `files_print_css`, `options`, `cssframework_name`, `cssframework_css`, `cssframework_js`, `packages_to_load`, `packages_ltr`, `packages_rtl`) VALUES
(1, 'vanilla', NULL, NULL, NULL, '{\"add\":[\"css/base.css\",\"css/theme.css\",\"css/noTablesOnMobile.css\",\"css/custom.css\"]}', '{\"add\":[\"scripts/theme.js\",\"scripts/ajaxify.js\",\"scripts/custom.js\"]}', '{\"add\":[\"css/print_theme.css\"]}', '{\"ajaxmode\":\"off\",\"brandlogo\":\"on\",\"container\":\"on\", \"hideprivacyinfo\": \"off\", \"brandlogofile\":\"themes/survey/vanilla/files/logo.png\",\"font\":\"noto\", \"showpopups\":\"1\", \"showclearall\":\"off\", \"questionhelptextposition\":\"top\"}', 'bootstrap', '{}', '', '{\"add\":[\"pjax\",\"font-noto\",\"moment\"]}', NULL, NULL),
(2, 'fruity', NULL, NULL, NULL, '{\"add\":[\"css/ajaxify.css\",\"css/animate.css\",\"css/variations/sea_green.css\",\"css/theme.css\",\"css/custom.css\"]}', '{\"add\":[\"scripts/theme.js\",\"scripts/ajaxify.js\",\"scripts/custom.js\"]}', '{\"add\":[\"css/print_theme.css\"]}', '{\"ajaxmode\":\"off\",\"brandlogo\":\"on\",\"brandlogofile\":\"themes/survey/fruity/files/logo.png\",\"container\":\"on\",\"backgroundimage\":\"off\",\"backgroundimagefile\":null,\"animatebody\":\"off\",\"bodyanimation\":\"fadeInRight\",\"bodyanimationduration\":\"500\",\"animatequestion\":\"off\",\"questionanimation\":\"flipInX\",\"questionanimationduration\":\"500\",\"animatealert\":\"off\",\"alertanimation\":\"shake\",\"alertanimationduration\":\"500\",\"font\":\"noto\",\"bodybackgroundcolor\":\"#ffffff\",\"fontcolor\":\"#444444\",\"questionbackgroundcolor\":\"#ffffff\",\"questionborder\":\"on\",\"questioncontainershadow\":\"on\",\"checkicon\":\"f00c\",\"animatecheckbox\":\"on\",\"checkboxanimation\":\"rubberBand\",\"checkboxanimationduration\":\"500\",\"animateradio\":\"on\",\"radioanimation\":\"zoomIn\",\"radioanimationduration\":\"500\",\"zebrastriping\":\"off\",\"stickymatrixheaders\":\"off\",\"greyoutselected\":\"off\",\"hideprivacyinfo\":\"off\",\"crosshover\":\"off\",\"showpopups\":\"1\", \"showclearall\":\"off\", \"questionhelptextposition\":\"top\",\"notables\":\"1\"}', 'bootstrap', '{}', '', '{\"add\":[\"pjax\",\"font-noto\",\"moment\"]}', NULL, NULL),
(3, 'bootswatch', NULL, NULL, NULL, '{\"add\":[\"css/ajaxify.css\",\"css/theme.css\",\"css/custom.css\"]}', '{\"add\":[\"scripts/theme.js\",\"scripts/ajaxify.js\",\"scripts/custom.js\"]}', '{\"add\":[\"css/print_theme.css\"]}', '{\"ajaxmode\":\"off\",\"brandlogo\":\"on\",\"container\":\"on\",\"brandlogofile\":\"themes/survey/bootswatch/files/logo.png\", \"showpopups\":\"1\", \"showclearall\":\"off\", \"questionhelptextposition\":\"top\"}', 'bootstrap', '{\"replace\":[[\"css/bootstrap.css\",\"css/variations/flatly.min.css\"]]}', '', '{\"add\":[\"pjax\",\"font-noto\",\"moment\"]}', NULL, NULL),
(4, 'fruity', 369829, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(5, 'fruity', NULL, 1, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(6, 'fruity', 737993, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(7, 'fruity', 841748, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(8, 'fruity', 1231, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(9, 'fruity', 572386, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(10, 'fruity', 727741, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(11, 'fruity', 947781, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL),
(12, 'fruity', 282638, NULL, NULL, 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', 'inherit', NULL, NULL);

--
-- Dumping data for table `lime_users`
--

INSERT INTO `lime_users` (`uid`, `users_name`, `password`, `full_name`, `parent_id`, `lang`, `email`, `htmleditormode`, `templateeditormode`, `questionselectormode`, `one_time_pw`, `dateformat`, `last_login`, `created`, `modified`, `validation_key`, `validation_key_expiration`, `last_forgot_email_password`, `expires`) VALUES
(1, 'admin', '$2y$10$uVIJOkQzG/4aHVqpocP68.dadZKkx1Sw9XTpG72vD2LfWc9alkbLK', 'Administrator', 0, 'en', 'your-email@example.net', 'default', 'default', 'default', NULL, 1, '2023-05-08 15:58:54', '2023-04-28 12:19:57', '2023-05-08 15:58:54', NULL, NULL, NULL, NULL),
(2, 'johnw', '$2y$10$C0wx7q9NPbcqYz./wdDiEuTkGMo2BUQQyz3L7xfSjSI72cdtwVrpy', 'John Wick', 1, 'auto', 'john.wick@test.it', 'default', 'default', 'default', NULL, 1, NULL, '2023-05-09 15:12:05', '2023-05-09 15:12:05', NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
