#!/bin/bash
# check if process exists
if [ "`ps aux|grep /acs/code/index.js|grep -v grep|wc -l`" -eq 0  ];then
  echo "check process failed"
  exit 1
else
  echo "success"
  exit 0
fi