export interface Hexagram {
  id: number;
  name: string;
  pinyin: string;
  vietnamese: string;
  binary: string; // 1 for Yang, 0 for Yin. From bottom (index 0) to top (index 5)
  meaning: string;
  image: string; // Tượng quẻ
  visualUrl?: string; // Descriptive image URL
}

export const TRIGRAM_IMAGES: Record<string, { label: string; url: string }> = {
  "111": { label: "Thiên (Trời)", url: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80&w=600" },
  "000": { label: "Địa (Đất)", url: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?auto=format&fit=crop&q=80&w=600" },
  "100": { label: "Lôi (Sấm)", url: "https://images.unsplash.com/photo-1605727282302-24c8ad420bc6?auto=format&fit=crop&q=80&w=600" },
  "011": { label: "Phong (Gió)", url: "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&q=80&w=600" },
  "010": { label: "Thủy (Nước)", url: "https://images.unsplash.com/photo-1520121121541-16eb7f0c8e21?auto=format&fit=crop&q=80&w=600" },
  "101": { label: "Hỏa (Lửa)", url: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&q=80&w=600" },
  "001": { label: "Sơn (Núi)", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
  "110": { label: "Trạch (Đầm)", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600" },
};

export const HEXAGRAMS: Record<string, Hexagram> = {
  "111111": { id: 1, name: "Càn", pinyin: "Qián", vietnamese: "Thuần Càn", binary: "111111", meaning: "Tượng trưng cho Trời, sự sáng tạo vô biên và sức mạnh thuần khiết. Thời vận cực thịnh, vạn vật hanh thông, đòi hỏi chính trực và kiên trì.", image: "Thiên hành kiện, quân tử dĩ tự cường bất tức" },
  "000000": { id: 2, name: "Khôn", pinyin: "Kūn", vietnamese: "Thuần Khôn", binary: "000000", meaning: "Tượng trưng cho Đất, sự nhu mì, bao dung và nâng đỡ. Cần sự thuận theo tự nhiên, bình tĩnh và đức dày để gánh vác đại sự.", image: "Địa thế khôn, quân tử dĩ hậu đức tải vật" },
  "100010": { id: 3, name: "Truân", pinyin: "Zhūn", vietnamese: "Thủy Lôi Truân", binary: "100010", meaning: "Gian nan ngay từ lúc khởi đầu. Như mầm non mới nhú gặp bão tố, cần bền gan vững chí, tìm cầu sự giúp đỡ từ người hiền.", image: "Vân lôi truân, quân tử dĩ kinh luân" },
  "010001": { id: 4, name: "Mông", pinyin: "Méng", vietnamese: "Sơn Thủy Mông", binary: "010001", meaning: "Thời kỳ non nớt, mờ tối như sương mù bao phủ núi cao. Cần tìm bậc thầy dẫn lối, khai mở trí tuệ bằng sự chân thành.", image: "Sơn hạ hữu thủy, mông; quân tử dĩ quả hạnh dưỡng đức" },
  "111010": { id: 5, name: "Nhu", pinyin: "Xū", vietnamese: "Thủy Thiên Nhu", binary: "111010", meaning: "Biết chờ đợi và kiên nhẫn. Sự hiểm nguy ở phía trước chưa thể vượt qua ngay, hãy tĩnh tâm bồi dưỡng sức mạnh và hy vọng.", image: "Vân thượng ư thiên, nhu; quân tử dĩ ẩm thực yến nhạc" },
  "010111": { id: 6, name: "Tụng", pinyin: "Sòng", vietnamese: "Thiên Thủy Tụng", binary: "010111", meaning: "Tranh chấp phát sinh do bất đồng. Dù có lý cũng nên tìm sự hòa giải sớm, tránh đi đến cùng cực kẻo chuốc lấy ưu phiền.", image: "Thiên dữ thủy vi hành, tụng; quân tử dĩ tác sự mưu thủy" },
  "010000": { id: 7, name: "Sư", pinyin: "Shī", vietnamese: "Địa Thủy Sư", binary: "010000", meaning: "Lực lượng quân đội, sự kỷ luật và chính nghĩa. Phải có tài lãnh đạo xuất chúng và danh chính ngôn thuận mới có thể bình thiên hạ.", image: "Địa trung hữu thủy, sư; quân tử dĩ dung dân súc chúng" },
  "000010": { id: 8, name: "Tỷ", pinyin: "Bǐ", vietnamese: "Thủy Địa Tỷ", binary: "000010", meaning: "Sự đoàn kết, gắn bó và tin cậy lẫn nhau. Hãy chọn lọc người hiền tài để cùng đồng hành, hậu vinh hiển ứng với lòng trung thành.", image: "Địa thượng hữu thủy, tỷ; tiên vương dĩ kiến vạn quốc, thân chư hầu" },
  "111011": { id: 9, name: "Tiểu Súc", pinyin: "Xiǎo Xù", vietnamese: "Phong Thiên Tiểu Súc", binary: "111011", meaning: "Sức mạnh bị kiềm chế nhẹ, tích lũy chưa đủ để làm việc lớn. Cần rèn luyện đức hạnh nhỏ để chuẩn bị cho cơ hội lớn mai sau.", image: "Phong hành thiên thượng, tiểu súc; quân tử dĩ văn đức" },
  "110111": { id: 10, name: "Lý", pinyin: "Lǐ", vietnamese: "Thiên Trạch Lý", binary: "110111", meaning: "Dẫm trên đuôi hổ mà hổ không cắn. Cần giữ lễ nghi, cẩn trọng trong từng bước đi để biến nguy nan thành bình an vô sự.", image: "Thiên thượng trạch hạ, lý; quân tử dĩ biện biệt thượng hạ" },
  "111000": { id: 11, name: "Thái", pinyin: "Tài", vietnamese: "Địa Thiên Thái", binary: "111000", meaning: "Thời vận hanh thông, âm dương giao hòa. Vạn vật tươi tốt, người hiền được trọng dụng, sự nghiệp phát triển bền vững.", image: "Thiên địa giao thái, thái; hậu dĩ tài thành thiên địa chi đạo" },
  "000111": { id: 12, name: "Bĩ", pinyin: "Pǐ", vietnamese: "Thiên Địa Bĩ", binary: "000111", meaning: "Trời đất không giao hòa, bế tắc và suy thoái. Kẻ tiểu nhân đắc thế, người quân tử nên ẩn mình, giữ vững tiết tháo chờ thời.", image: "Thiên địa bất giao, bĩ; quân tử dĩ kiệm đức tịch nan" },
  "101111": { id: 13, name: "Đồng Nhân", pinyin: "Tóng Rén", vietnamese: "Thiên Hỏa Đồng Nhân", binary: "101111", meaning: "Cùng chung chí hướng với cộng đồng. Sự công tâm và đoàn kết sẽ vượt qua mọi rào cản, tạo nên sự nghiệp vang dội.", image: "Thiên dữ hỏa, đồng nhân; quân tử dĩ loại tộc biện vật" },
  "111101": { id: 14, name: "Đại Hữu", pinyin: "Dà Yǒu", vietnamese: "Hỏa Thiên Đại Hữu", binary: "111101", meaning: "Sở hữu vinh hoa lớn, rực rỡ như mặt trời trên cao. Cần khiêm tốn thái quá và thuận theo thiên đạo để tránh tai ương.", image: "Hỏa tại thiên thượng, đại hữu; quân tử dĩ át ác dương thiện" },
  "000100": { id: 15, name: "Khiêm", pinyin: "Qiān", vietnamese: "Địa Sơn Khiêm", binary: "000100", meaning: "Núi cao ở dưới đất, đạo của sự khiêm nhường. Người khiêm tốn sẽ được trời giúp, người yêu mến, làm việc gì cũng thành.", image: "Địa trung hữu sơn, khiêm; quân tử dĩ bồi đa ích quả" },
  "001000": { id: 16, name: "Dự", pinyin: "Yù", vietnamese: "Lôi Địa Dự", binary: "001000", meaning: "Niềm vui sướng, phấn khởi và chuẩn bị dự phòng. Khi thuận theo lòng người, sấm động đất tươi, mọi việc đều suôn sẻ.", image: "Lôi xuất địa phấn, dự; tiên vương dĩ tác nhạc sùng đức" },
  "100110": { id: 17, name: "Tùy", pinyin: "Suí", vietnamese: "Trạch Lôi Tùy", binary: "100110", meaning: "Thuận theo hoàn cảnh và lòng người. Biết tùy thời mà hành động, tìm kiếm sự thảnh thơi trong sự biến chuyển của cuộc đời.", image: "Trạch trung hữu lôi, tùy; quân tử dĩ hướng hối nhập yến hưu" },
  "011001": { id: 18, name: "Cổ", pinyin: "Gǔ", vietnamese: "Sơn Phong Cổ", binary: "011001", meaning: "Sự thối rữa, đình trệ từ bên trong. Cần một cuộc cải tổ mạnh mẽ, quét sạch u mê để bắt đầu một hành trình tươi mới.", image: "Sơn hạ hữu phong, cổ; quân tử dĩ chấn dân dưỡng đức" },
  "110000": { id: 19, name: "Lâm", pinyin: "Lín", vietnamese: "Địa Trạch Lâm", binary: "110000", meaning: "Thời kỳ lớn mạnh và tiến đến gần thành công. Như mùa xuân đang về, cần hành động nhanh chóng nhưng cẩn trọng hậu sự.", image: "Trạch thượng hữu địa, lâm; quân tử dĩ giáo tư vô cùng" },
  "000011": { id: 20, name: "Quan", pinyin: "Guān", vietnamese: "Phong Địa Quan", binary: "000011", meaning: "Giữ mình để quan sát thế sự. Cần sự tỉnh táo tuyệt đối, xem xét sâu sắc để thấu hiểu đạo lý và hành động chính trực.", image: "Phong hành địa thượng, quan; tiên vương dĩ tỉnh phương quan dân" },
  "100101": { id: 21, name: "Phệ Hạp", pinyin: "Shì Hé", vietnamese: "Hỏa Lôi Phệ Hạp", binary: "100101", meaning: "Cắn đứt sự cản trở. Có sự không minh bạch hoặc oan ức cần dùng pháp luật và sự minh mẫn để giải quyết triệt để.", image: "Lôi điện phệ hạp; tiên vương dĩ minh phạt sắc pháp" },
  "101001": { id: 22, name: "Bí", pinyin: "Bì", vietnamese: "Sơn Hỏa Bí", binary: "101001", meaning: "Vẻ đẹp trang sức, hình thức bên ngoài. Nên dùng sự hài hòa để tô điểm cuộc sống nhưng đừng quên bản chất cốt lõi bên trong.", image: "Sơn hạ hữu hỏa, bí; quân tử dĩ minh thứ chính" },
  "000001": { id: 23, name: "Bác", pinyin: "Bō", vietnamese: "Sơn Địa Bác", binary: "000001", meaning: "Sự bóc lột, phá hủy đến tận cùng. Thời vận gian truân, tiểu nhân lấn lướt quân tử, tốt nhất là ẩn nhẫn thủ thường.", image: "Sơn phụ ư địa, bác; thượng dĩ hậu hạ an trạch" },
  "100000": { id: 24, name: "Phục", pinyin: "Fù", vietnamese: "Địa Lôi Phục", binary: "100000", meaning: "Chu kỳ mới bắt đầu trở lại. Sau đêm tối là bình minh, mầm sống mới xuất hiện dưới lòng đất, hứa hẹn một sự hồi sinh mạnh mẽ.", image: "Địa trung lôi phục; tiên vương dĩ chí nhật bế quan" },
  "100111": { id: 25, name: "Vô Vọng", pinyin: "Wú Wàng", vietnamese: "Thiên Lôi Vô Vọng", binary: "100111", meaning: "Sự chân thực và không xảo trá. Thuận theo tự nhiên, đừng mưu cầu phi pháp hay hành động liều lĩnh kẻo rước họa vào thân.", image: "Thiên hạ lôi hành, vô vọng; tiên vương dĩ mậu đối thời" },
  "111001": { id: 26, name: "Đại Súc", pinyin: "Dà Xù", vietnamese: "Sơn Thiên Đại Súc", binary: "111001", meaning: "Tích trữ sức mạnh và tinh hoa lớn. Thời cơ chín muồi để thực hiện những hoài bão vĩ đại, dùng đức dày để dẫn dắt.", image: "Thiên tại sơn trung, đại súc; quân tử dĩ đa thức tiền ngôn" },
  "100001": { id: 27, name: "Di", pinyin: "Yí", vietnamese: "Sơn Lôi Di", binary: "100001", meaning: "Nuôi dưỡng bản thân và người khác. Cẩn trọng từ lời ăn tiếng nói đến thực phẩm, giữ tâm trong sạch để bồi đắp khí chất.", image: "Sơn hạ hữu lôi, di; quân tử dĩ thận ngôn ngữ, tiết ẩm thực" },
  "011110": { id: 28, name: "Đại Quá", pinyin: "Dà Guò", vietnamese: "Trạch Phong Đại Quá", binary: "011110", meaning: "Cột trụ lung lay do gánh nặn quá mức. Tình thế nguy kịch đòi hỏi sự quyết đoán phi thường và lòng dũng cảm để chuyển mình.", image: "Trạch diệt mộc, đại quá; quân tử dĩ độc lập bất cụ" },
  "010010": { id: 29, name: "Khảm", pinyin: "Kǎn", vietnamese: "Thuần Khảm", binary: "010010", meaning: "Hiểm trở chồng chất như vực thẳm. Phải giữ lòng tin son sắt, linh hoạt như nước để vượt qua gian truân mà không mất bản chất.", image: "Thủy bôn chí, khảm; quân tử dĩ thường đức hạnh" },
  "101101": { id: 30, name: "Ly", pinyin: "Lí", vietnamese: "Thuần Ly", binary: "101101", meaning: "Rực rỡ như lửa lung linh. Sự thông tuệ và bám víu vào chính nghĩa sẽ mang lại ánh sáng cho thế gian, cát lợi bền lâu.", image: "Minh lưỡng tác, ly; đại nhân dĩ kế minh chiếu vu tứ phương" },
  "001110": { id: 31, name: "Hàm", pinyin: "Xián", vietnamese: "Trạch Sơn Hàm", binary: "001110", meaning: "Sự giao cảm chân thành. Như tình yêu nam nữ thuở ban đầu, sự rung động từ trái tim sẽ kết nối mọi khoảng cách.", image: "Sơn thượng hữu trạch, hàm; quân tử dĩ hư thụ nhân" },
  "011100": { id: 32, name: "Hằng", pinyin: "Héng", vietnamese: "Lôi Phong Hằng", binary: "011100", meaning: "Sự bền bỉ và vĩnh cửu. Giữ vững đạo đức và mục tiêu trước mọi biến động của thời gian sẽ gặt hái được thành quả viên mãn.", image: "Lôi phong, hằng; quân tử dĩ lập bất đạo phương" },
  "001111": { id: 33, name: "Độn", pinyin: "Dùn", vietnamese: "Thiên Sơn Độn", binary: "001111", meaning: "Rút lui chiến thuật. Khi bóng tối lấn át, người trí tuệ biết lùi bước để bảo toàn thực lực, giữ khoảng cách với tiểu nhân.", image: "Thiên hạ hữu sơn, độn; quân tử dĩ viễn tiểu nhân" },
  "111100": { id: 34, name: "Đại Tráng", pinyin: "Dà Zhuàng", vietnamese: "Lôi Thiên Đại Tráng", binary: "111100", meaning: "Sức mạnh cực thịnh, uy thế lừng lẫy. Cần biết kiềm chế, đừng cậy thế mà làm liều, phải thủ lễ mới giữ được bền vững.", image: "Lôi tại thiên thượng, đại tráng; quân tử dĩ phi lễ vật lý" },
  "000101": { id: 35, name: "Tấn", pinyin: "Jìn", vietnamese: "Hỏa Địa Tấn", binary: "000101", meaning: "Thăng tiến rạng rỡ như mặt trời mới mọc. Tài năng được trọng dụng, sự nghiệp hanh thông, công thành danh toại.", image: "Minh xuất địa thượng, tấn; quân tử dĩ tự chiêu minh đức" },
  "101000": { id: 36, name: "Minh Di", pinyin: "Míng Yí", vietnamese: "Địa Hỏa Minh Di", binary: "101000", meaning: "Ánh sáng bị che khuất trong lòng đất. Thời kỳ khó khăn, cần giấu kín sự sáng suốt, nhẫn nhục chịu đựng chờ ngày tái ngộ.", image: "Minh nhập địa trung, minh di; quân tử dĩ lị chúng dụng hối" },
  "101011": { id: 37, name: "Gia Nhân", pinyin: "Jiā Rén", vietnamese: "Phong Hỏa Gia Nhân", binary: "101011", meaning: "Đạo lý trong gia đình. Sự chính trực của người cha, sự nhu mì của người mẹ sẽ tạo nên nền tảng vững chắc cho mọi sự nghiệp.", image: "Phong tự hỏa xuất, gia nhân; quân tử dĩ ngôn hữu vật" },
  "110101": { id: 38, name: "Khuê", pinyin: "Kuí", vietnamese: "Hỏa Trạch Khuê", binary: "110101", meaning: "Xa cách và bất đồng. Giống như lửa bốc lên, nước chảy xuống, cần tìm kiếm sự hài hòa trong những khác biệt để thành công.", image: "Hỏa thượng trạch hạ, khuê; quân tử dĩ đồng nhi dị" },
  "001010": { id: 39, name: "Kiển", pinyin: "Jiǎn", vietnamese: "Thủy Sơn Kiển", binary: "001010", meaning: "Gian nan hiểm trở phía trước. Nên dừng lại suy ngẫm, quay lại bồi dưỡng bản thân thay vì cố chấp lao vào nguy khốn.", image: "Sơn thượng hữu thủy, kiển; quân tử dĩ phản thân tu đức" },
  "010100": { id: 40, name: "Giải", pinyin: "Xiè", vietnamese: "Lôi Thủy Giải", binary: "010100", meaning: "Sự giải tỏa mọi oán hận và khó khăn. Sau cơn mưa trời lại sáng, hãy tha thứ lỗi lầm cũ để cùng nhau tiến về phía trước.", image: "Lôi vũ tác, giải; quân tử dĩ xá quá hữu tội" },
  "110001": { id: 41, name: "Tổn", pinyin: "Sǔn", vietnamese: "Sơn Trạch Tổn", binary: "110001", meaning: "Bớt cái dư thừa để bồi đắp cái thiếu hụt. Sự chân thành và biết hy sinh lợi ích nhỏ sẽ mang lại phúc báo lớn lao.", image: "Sơn hạ hữu trạch, tổn; quân tử dĩ trừng phẫn dịch dục" },
  "100011": { id: 42, name: "Ích", pinyin: "Yì", vietnamese: "Phong Lôi Ích", binary: "100011", meaning: "Sự thêm vào và phát triển vượt bậc. Khi thời cơ đến, hãy nỗ lực hết mình, cải thiện bản thân và giúp ích cho cộng đồng.", image: "Phong lôi, ích; quân tử dĩ kiến thiện tắc thiên" },
  "111110": { id: 43, name: "Quải", pinyin: "Guài", vietnamese: "Trạch Thiên Quải", binary: "111110", meaning: "Quyết liệt loại bỏ cái xấu. Cần sự cương quyết nhưng phải giữ sự ôn hòa và minh bạch để tránh sự trả thù từ bóng tối.", image: "Trạch thượng ư thiên, quải; quân tử dĩ thi lộc cập hạ" },
  "011111": { id: 44, name: "Cấu", pinyin: "Gòu", vietnamese: "Thiên Phong Cấu", binary: "011111", meaning: "Gặp gỡ tình cờ nhưng chứa đựng hiểm họa. Cẩn thận với những tác động tiêu cực len lỏi vào cuộc sống khi ta sơ hở nhất.", image: "Thiên hạ hữu phong, cấu; hậu dĩ thi mệnh cáo tứ phương" },
  "000110": { id: 45, name: "Tụy", pinyin: "Cuì", vietnamese: "Trạch Địa Tụy", binary: "000110", meaning: "Sự quần tụ và đoàn kết sức mạnh. Phải có sự chuẩn bị chu đáo và lòng chính trực để dẫn dắt đám đông đi đến thành công.", image: "Trạch thượng hữu địa, tụy; quân tử dĩ duyệt khí phi nhung" },
  "011000": { id: 46, name: "Thăng", pinyin: "Shēng", vietnamese: "Địa Phong Thăng", binary: "011000", meaning: "Tiến bước lên cao như mộc sinh từ đất. Sự nghiệp thăng tiến vững chắc nhờ sự nỗ lực không ngừng và đức hạnh sáng ngời.", image: "Địa trung sinh mộc, thăng; quân tử dĩ thuận đức tích tiểu" },
  "010110": { id: 47, name: "Khốn", pinyin: "Kùn", vietnamese: "Trạch Thủy Khốn", binary: "010110", meaning: "Khốn cùng bế tắc, nước cạn đầm khô. Thử thách bản lĩnh của người quân tử, hãy dùng sự im lặng và kiên tâm để vượt qua.", image: "Trạch vô thủy, khốn; quân tử dĩ trí mệnh toại chí" },
  "011010": { id: 48, name: "Tỉnh", pinyin: "Jǐng", vietnamese: "Thủy Phong Tỉnh", binary: "011010", meaning: "Hình tượng giếng nước sâu thẳm. Nguồn sống vô tận nếu biết gìn giữ và tu sửa, dạy ta đạo lý về sự ổn định và chia sẻ.", image: "Mộc thượng hữu thủy, tỉnh; quân tử dĩ lao dân khuyến tương" },
  "101110": { id: 49, name: "Cách", pinyin: "Gé", vietnamese: "Trạch Hỏa Cách", binary: "101110", meaning: "Cuộc cách mệnh thay cũ đổi mới. Cần thời cơ chín muồi và lòng tin tuyệt đối của mọi người mới có thể thay đổi vận mệnh.", image: "Trạch trung hữu hỏa, cách; quân tử dĩ trị lịch minh thời" },
  "011101": { id: 50, name: "Đỉnh", pinyin: "Dǐng", vietnamese: "Hỏa Phong Đỉnh", binary: "011101", meaning: "Hình tượng cái đỉnh vững chắc. Sự thành công rực rỡ và uy tín cao thượng, ứng với việc bồi dưỡng nhân tài cho quốc gia.", image: "Mộc thượng hữu hỏa, đỉnh; quân tử dĩ chính vị ngưng mệnh" },
  "100100": { id: 51, name: "Chấn", pinyin: "Zhèn", vietnamese: "Thuần Chấn", binary: "100100", meaning: "Sấm sét kinh động tâm can. Cần sự bình tĩnh trước những biến cố bất ngờ, lấy đó làm động lực để cải thiện bản thân.", image: "Tiệm lôi, chấn; quân tử dĩ sợ hãi tu tỉnh" },
  "001001": { id: 52, name: "Cấn", pinyin: "Gèn", vietnamese: "Thuần Cấn", binary: "001001", meaning: "Dừng lại như núi cao sừng sững. Biết khi nào nên dừng, khi nào nên tiến để đạt được trạng thái tĩnh lặng và sáng suốt.", image: "Kiêm sơn, cấn; quân tử dĩ tư bất xuất kỳ vị" },
  "001011": { id: 53, name: "Tiệm", pinyin: "Jiàn", vietnamese: "Phong Sơn Tiệm", binary: "001011", meaning: "Tiến lên từng bước vững chắc. Như chim bay lên cao, sự nghiệp phát triển tuần tự sẽ mang lại kết quả bền vững mãi về sau.", image: "Sơn thượng hữu mộc, tiệm; quân tử dĩ cư hiền thiện tục" },
  "110100": { id: 54, name: "Quy Muội", pinyin: "Guī Mèi", vietnamese: "Lôi Trạch Quy Muội", binary: "110100", meaning: "Thiếu nữ đi lấy chồng, sự nóng vội. Cẩn thận với những quyết định cảm tính không đúng trình tự, dễ dẫn đến hối tiếc.", image: "Trạch thượng hữu lôi, quy muội; quân tử dĩ vĩnh chung tri mạt" },
  "101100": { id: 55, name: "Phong", pinyin: "Fēng", vietnamese: "Lôi Hỏa Phong", binary: "101100", meaning: "Thịnh vượng rực rỡ đến cực điểm. Hãy tận hưởng và chia sẻ nhưng đừng quên quy luật thịnh suy của đất trời.", image: "Lôi điện giai chí, phong; quân tử dĩ chiết ngục trí hình" },
  "001101": { id: 56, name: "Lữ", pinyin: "Lǚ", vietnamese: "Hỏa Sơn Lữ", binary: "001101", meaning: "Thân phận lữ khách viễn xứ. Sự bất định và tạm bợ, cần sự nhún nhường và cẩn trọng để bảo toàn thân mình nơi đất khách.", image: "Sơn thượng hữu hỏa, lữ; quân tử dĩ minh thận dụng hình" },
  "011011": { id: 57, name: "Tốn", pinyin: "Xùn", vietnamese: "Thuần Tốn", binary: "011011", meaning: "Nhu thuận như làn gió thoảng qua. Sự mềm mỏng nhưng dai dẳng giúp thấu hiểu lẽ đời và đạt được mục đích một cách nhẹ nhàng.", image: "Tùy phong, tốn; đại nhân dĩ thân mệnh hành sự" },
  "110110": { id: 58, name: "Đoài", pinyin: "Duì", vietnamese: "Thuần Đoài", binary: "110110", meaning: "Niềm vui sướng qua sự trao đổi. Hãy dùng sự chân thành và hiền hòa để gắn kết mọi người, tạo ra sự hài lòng chung.", image: "Lệ trạch, đoài; quân tử dĩ bằng hữu giảng tập" },
  "010011": { id: 59, name: "Hoán", pinyin: "Huàn", vietnamese: "Phong Thủy Hoán", binary: "010011", meaning: "Sự tan loãng những ngăn cách. Như gió thổi tan sương mù, cần sự bao dung và niềm tin lớn để gắn kết những gì đã rạn nứt.", image: "Phong hành thủy thượng, hoán; tiên vương dĩ hưởng đế lập miếu" },
  "110010": { id: 60, name: "Tiết", pinyin: "Jié", vietnamese: "Thủy Trạch Tiết", binary: "110010", meaning: "Biết tiết chế và chừng mực. Sự hạn chế là cần thiết để bảo toàn tài đức, nhưng đừng quá khắc khe làm mất vẻ tự nhiên.", image: "Trạch thượng hữu thủy, tiết; quân tử dĩ chế độ số nghị đức" },
  "110011": { id: 61, name: "Trung Phu", pinyin: "Zhōng Fú", vietnamese: "Phong Trạch Trung Phu", binary: "110011", meaning: "Lòng tin chân thành thấu đến trời xanh. Sự trung thực tuyệt đối sẽ khuất phục được cả muông thú, tạo nên sức mạnh vô song.", image: "Phong hành trạch thượng, trung phu; quân tử dĩ nghị ngục hoãn tử" },
  "001100": { id: 62, name: "Tiểu Quá", pinyin: "Xiǎo Guò", vietnamese: "Lôi Sơn Tiểu Quá", binary: "001100", meaning: "Hơi quá đà trong việc nhỏ. Nên chọn sự khiêm tốn thái quá và tiết kiệm để bù đắp, tránh làm việc lớn lúc này.", image: "Sơn thượng hữu lôi, tiểu quá; quân tử dĩ hành quá hồ cung" },
  "101010": { id: 63, name: "Kí Tế", pinyin: "Jì Jì", vietnamese: "Thủy Hỏa Kí Tế", binary: "101010", meaning: "Mọi việc đã hoàn tất viên mãn. Cần hết sức đề phòng sự lơ là, vì khi đạt đến đỉnh cao chính là lúc suy vong bắt đầu khởi động.", image: "Thủy tại hỏa thượng, kí tế; quân tử dĩ tư hoạn nhi dự phòng" },
  "010101": { id: 64, name: "Vị Tế", pinyin: "Wèi Jì", vietnamese: "Hỏa Thủy Vị Tế", binary: "010101", meaning: "Sự nghiệp chưa hoàn thành, khởi đầu một vòng lặp mới. Còn nhiều hy vọng, hãy cẩn trọng bước đi cuối cùng để đạt thành tựu.", image: "Hỏa tại thủy thượng, vị tế; quân tử dĩ thận biện vật cư phương" },
};

export function getHexagramByBinary(binary: string): Hexagram | undefined {
  return HEXAGRAMS[binary];
}

export function generateLines(): number[] {
  const lines: number[] = [];
  for (let i = 0; i < 6; i++) {
    // 3 coins: 0 for tail (2), 1 for head (3)
    const coins = [Math.round(Math.random()), Math.round(Math.random()), Math.round(Math.random())];
    const sum = coins.reduce((acc, val) => acc + (val === 1 ? 3 : 2), 0);
    lines.push(sum);
  }
  return lines;
}

export function linesToBinary(lines: number[]): string {
  // 6 or 8 is Yin, 7 or 9 is Yang
  return lines.map(l => (l === 7 || l === 9 ? "1" : "0")).join("");
}

export function getChangingLines(lines: number[]): number[] {
  // 6 and 9 are changing lines (moving lines)
  return lines.map((l, i) => (l === 6 || l === 9 ? i + 1 : -1)).filter(i => i !== -1);
}

export function getTrigrams(binary: string) {
  const lower = binary.substring(0, 3);
  const upper = binary.substring(3, 6);
  return {
    lower: TRIGRAM_IMAGES[lower],
    upper: TRIGRAM_IMAGES[upper]
  };
}
