#!/bin/zsh

mysql -Nse 'show tables' ls-ce | while read table; do if [ $table != "lime_settings_global" ]; then mysql -e "truncate table $table" ls-ce; fi; done

mysql -Nse 'show tables' ls-ce | while read table; do if [[ $table =~ "lime_survey_[0-9].*" || $table =~ "lime_tokens_[0-9].*" || $table =~ "lime_old_survey_[0-9_].*" || $table =~ "lime_old_tokens_[0-9_].*" ]]; then mysql -e "drop table $table" ls-ce; fi; done

mysql ls-ce < ls-ce.sql