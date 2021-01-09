
text_file = open("Output.txt", "w")
text_file.write('\t'.join(['a', 'b', 'c']) + '\n')
text_file.write('\n')
text_file.write('\t'.join(['a', 'b', 'c']))
text_file.close()