#coding=utf-8
import xlrd
import datetime
from datetime import date

names = ['SELL_33_430947781_2020-12-27', 'SELL_33_430947781_2020-12-28', 'SELL_33_430947781_2020-12-29', 'SELL_33_430947781_2020-12-30', 'SELL_33_430947781_2020-12-31', 'SELL_33_430947781_2021-1-1', 'SELL_33_430947781_2021-1-2']

# names = ['SELL-TOTAL_2020-12-27', 'SELL-TOTAL_2020-12-28']
def read_excel():
  #打开文件
  wb = xlrd.open_workbook(r'嵊州房地产.xlsx')

  before = []
  after = []
  for name in names:
    sheet = wb.sheet_by_name(name)
    rowNum = sheet.nrows
    colNum = sheet.ncols

    # 每次清空
    after = []
    for i in range(rowNum):
      after.append('\t'.join(sheet.row_values(i, 0, colNum)))

    if (len(before) == 0):
      before = after


    diff = []
    for be in before:
      if (be not in after):
        diff.append(be)

    for af in after:
        if(af not in before):
          diff.append(af)

    print('name' + name)
    print('\n'.join(diff))
    before = after


      # for col in range(colNum):
      #   temp.append()


  # #获取所有sheet的名字
  # print(wb.sheet_names())
  # #获取第二个sheet的表明
  # sheet2 = wb.sheet_names()[1]
  # #sheet1索引从0开始，得到sheet1表的句柄
  # sheet1 = wb.sheet_by_index(0)
  # rowNum = sheet1.nrows
  # colNum = sheet1.ncols
  # #s = sheet1.cell(1,0).value.encode('utf-8')
  # s = sheet1.cell(1,0).value
  # #获取某一个位置的数据
  # # 1 ctype : 0 empty,1 string, 2 number, 3 date, 4 boolean, 5 error
  # print(sheet1.cell(1,2).ctype)
  # print(s)
  # #print(s.decode('utf-8'))
  # #获取整行和整列的数据
  # #第二行数据
  # row2 = sheet1.row_values(1)
  # #第二列数据
  # cols2 = sheet1.col_values(2)
  # #python读取excel中单元格内容为日期的方式
  # #返回类型有5种
  # for i in range(rowNum):
  #   if sheet1.cell(i,2).ctype == 3:
  #     d = xlrd.xldate_as_tuple(sheet1.cell_value(i,2),wb.datemode)
  #     print(date(*d[:3]),end='')
  #     print('\n')

if __name__ == '__main__':
  read_excel()
