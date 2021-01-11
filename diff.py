#coding=utf-8
# import xlrd
from openpyxl import load_workbook
import datetime
from datetime import date

result_file = open("result.txt", "w")

# 上悦城
# names = [
#   'SELL_33_430947781_2020-12-27',
#   'SELL_33_430947781_2020-12-28',
#   'SELL_33_430947781_2020-12-29',
#   'SELL_33_430947781_2020-12-30',
#   'SELL_33_430947781_2020-12-31',
#   'SELL_33_430947781_2021-1-1',
#   'SELL_33_430947781_2021-1-2',
#   'SELL_33_430947781_2021-1-3',
#   'SELL_33_430947781_2021-1-4',
#   'SELL_33_430947781_2021-1-5',
#   'SELL_33_430947781_2021-1-6',
#   'SELL_33_430947781_2021-1-7',
#   'SELL_33_430947781_2021-1-8'
# ]
# 和雍锦世家
# names = [
#   'SELL_33_135092_2020-12-29',
#   'SELL_33_135092_2020-12-30',
#   'SELL_33_135092_2020-12-31',
#   'SELL_33_135092_2021-1-1',
#   'SELL_33_135092_2021-1-2',
#   'SELL_33_135092_2021-1-3',
#   'SELL_33_135092_2021-1-4',
#   'SELL_33_135092_2021-1-5',
#   'SELL_33_135092_2021-1-6',
#   'SELL_33_135092_2021-1-7',
#   'SELL_33_135092_2021-1-8'
# ]
# 铁建观河府
names = [
  'SELL_33_1770989_2021-1-8',
  'SELL_33_1770989_2021-1-9',
]
# 恒大未来城
# names = [
#   'SELL_33_209800506_2021-1-9',
# ]


# names = ['SELL-TOTAL_2020-12-27', 'SELL-TOTAL_2020-12-28']
def read_excel():
  #打开文件
  wb = load_workbook('/Users/zhoukeke/Downloads/data2.xlsx')
  before = []
  after = []

  for name in names:
    # sheet = wb.sheet_by_name(name)
    sheet = wb[name]

    # 每次清空
    after = []

    for row in sheet.rows:
      rowValues = []
      for cell in row:
        rowValues.append(cell.value)
      after.append('\t'.join(rowValues))

    if (len(before) == 0):
      before = after

    diff = []
    # for be in before:
    #   if (be not in after):
    #     diff.append(be)

    for af in after:
        if(af not in before):
          diff.append(af)

    result_file.write(name + '\n')
    result_file.write('\n'.join(diff))
    result_file.write('\n')
    before = after

if __name__ == '__main__':
  read_excel()
  result_file.close()
