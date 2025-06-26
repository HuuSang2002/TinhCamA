

        // 4. Hiệu ứng nền tương tác
        function initInteractiveBg() {
            const bg = document.getElementById('interactive-bg');
            
            // Tạo các hạt nền
            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.className = 'bg-particle';
                
                // Vị trí ngẫu nhiên
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Kích thước ngẫu nhiên
                const size = 1 + Math.random() * 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Hiệu ứng di chuyển chậm
                particle.style.transition = `transform ${10 + Math.random() * 20}s linear`;
                
                bg.appendChild(particle);
            }
            
            // Hiệu ứng khi di chuột
            document.addEventListener('mousemove', (e) => {
                const particles = document.querySelectorAll('.bg-particle');
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                particles.forEach((particle, i) => {
                    // Tính toán vị trí mới dựa trên vị trí chuột
                    const x = parseFloat(particle.style.left) / 100 * window.innerWidth;
                    const y = parseFloat(particle.style.top) / 100 * window.innerHeight;
                    
                    const distance = Math.sqrt(Math.pow(x - e.clientX, 2) + Math.pow(y - e.clientY, 2));
                    const force = Math.max(0, (200 - distance) / 200);
                    
                    const angle = Math.atan2(y - e.clientY, x - e.clientX);
                    const moveX = Math.cos(angle) * force * 20;
                    const moveY = Math.sin(angle) * force * 20;
                    
                    particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });
        }
        
        // 5. Hiệu ứng trái tim bay khi click
        function initFloatingHearts() {
            document.addEventListener('click', (e) => {
                for (let i = 0; i < 5; i++) {
                    createFloatingHeart(e.clientX, e.clientY);
                }
            });
        }
        
        function createFloatingHeart(x, y) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            
            // Vị trí bắt đầu
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            
            // Animation
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 0.5;
            const rotation = Math.random() * 360;
            
            heart.style.animation = `floatUp ${duration}s ease-in ${delay}s forwards`;
            heart.style.transform = `rotate(${rotation}deg)`;
            
            document.body.appendChild(heart);
            
            // Tự động xóa sau khi animation kết thúc
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
        
        // Khởi tạo các hiệu ứng khi trang load
        window.addEventListener('load', () => {
            // Các hiệu ứng cũ giữ nguyên
            
            // Thêm các hiệu ứng mới
            createPetals();
            addSparkleEffect();
            initInteractiveBg();
            initFloatingHearts();
            
            // Pháo hoa tự động mỗi 10 giây
            setInterval(createFirework, 10000);
            
            // Thêm class sparkle-text cho các tiêu đề
            document.querySelectorAll('h1, h2, .couple-names').forEach(el => {
                el.classList.add('sparkle-text');
            });
        });


        
        // Set the date we're counting up from (April 20, 2025)
        const loveDate = new Date("April 20, 2025 00:00:00").getTime();
        let currentDisplayedHearts = 0;
        let leavesInterval;

        // Update the count every 1 second
        const countUp = setInterval(function() {
            const now = new Date().getTime();
            const distance = now - loveDate;
            
            // If the love date hasn't started yet (negative distance)
            if (distance < 0) {
                document.getElementById("days").innerHTML = "0";
                document.getElementById("hours").innerHTML = "0";
                document.getElementById("minutes").innerHTML = "0";
                document.getElementById("seconds").innerHTML = "0";
                document.getElementById("total-days").innerHTML = "0";
                return;
            }
            
            updateCounter(distance);
            updateTreeHearts(Math.floor(distance / (1000 * 60 * 60 * 24)));
        }, 1000);

        function updateCounter(distance) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
            document.getElementById("total-days").innerHTML = days;
        }

        function updateTreeHearts(daysTogether) {
            const treeContainer = document.querySelector('.tree-container');
            
            // Chỉ thêm trái tim mới nếu số ngày tăng lên
            if (daysTogether > currentDisplayedHearts) {
                for (let i = currentDisplayedHearts; i < daysTogether; i++) {
                    if (i < 500) { // Giới hạn tối đa 500 trái tim
                        addHeartToTree(treeContainer, i);
                    }
                }
                currentDisplayedHearts = daysTogether;
            }
        }

   function addHeartToTree(container, index) {
            const heart = document.createElement('div');
            heart.className = 'love-heart';
            
            // Tính toán vị trí ngẫu nhiên xung quanh cây
            const angle = Math.random() * Math.PI * 2;
            const radius = 50 + Math.random() * 150;
            
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            heart.style.left = `calc(50% + ${x}px)`;
            heart.style.top = `calc(70% + ${y}px)`;
            
            // Kích thước ngẫu nhiên
            const size = 20 + Math.random() * 30;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // Màu sắc ngẫu nhiên
            const hue = Math.random() * 360;
            heart.style.filter = `hue-rotate(${hue}deg) brightness(1.2)`;
            
            // Thêm vào container
            const treeContainer = document.getElementById('love-tree');
            treeContainer.appendChild(heart);
            
            // Hiệu ứng xuất hiện
            setTimeout(() => {
                heart.classList.add('show');
            }, index * 100);
            
            // Hiệu ứng khi hover
            heart.addEventListener('mouseenter', () => {
                heart.style.transform = 'scale(1.5)';
                heart.style.zIndex = '10';
            });
            
            heart.addEventListener('mouseleave', () => {
                heart.style.transform = 'scale(1)';
                heart.style.zIndex = '4';
            });
        }
        
        // Tạo các trái tim ban đầu
        window.onload = function() {
            const now = new Date().getTime();
            const loveDate = new Date("April 20, 2025 00:00:00").getTime();
            const distance = now - loveDate;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                for (let i = 0; i < Math.min(days, 100); i++) {
                    setTimeout(() => addHeartToTree(null, i), i * 50);
                }
            }
        };
        // Hiệu ứng timeline khi scroll
        function checkTimelineVisibility() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight - 100) {
                    item.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkTimelineVisibility);
        window.addEventListener('load', checkTimelineVisibility);

        // Initial setup
        window.onload = function() {
            const now = new Date().getTime();
            const distance = now - loveDate;
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                updateTreeHearts(days);
            }
            
            // Tạo một vài sao băng ngay khi load trang
            for (let i = 0; i < 5; i++) {
                setTimeout(createShootingStar, i * 300);
            }
        };