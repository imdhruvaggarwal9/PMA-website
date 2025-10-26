// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function setSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto advance slides every 5 seconds (only on home page)
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Fetch live market data
async function fetchMarketData() {
    const marketDataDiv = document.getElementById('market-data');
    
    if (!marketDataDiv) return;
    
    try {
        // Simulated market data
        // In production, replace with actual API calls
        const simulatedData = [
            { name: 'BSE SENSEX', value: '84,211.88', change: '−344.52 (0.41%)', positive: false },
            { name: 'NIFTY 50', value: '25,795.15', change: '−96.25 (0.37%)', positive: false },
            { name: 'Gold (₹/10g)', value: '1,25,280.00', change: '+0.15%', positive: true },
            { name: 'USD/INR', value: '₹87.82', change: '+0.08%', positive: true }
        ];

        
        // Display market data
        let html = '';
        simulatedData.forEach(item => {
            html += `
                <div class="market-item">
                    <div class="market-name">${item.name}</div>
                    <div class="market-value ${item.positive ? 'positive' : 'negative'}">${item.value}</div>
                    <div class="market-change ${item.positive ? 'positive' : 'negative'}">${item.change}</div>
                </div>
            `;
        });
        
        marketDataDiv.innerHTML = html;
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        marketDataDiv.innerHTML += `<div style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: #666;">Last updated: ${timestamp}</div>`;
        
    } catch (error) {
        console.error('Error fetching market data:', error);
        marketDataDiv.innerHTML = `
            <div class="market-item">
                <div class="market-name">BSE SENSEX</div>
                <div class="market-value positive">84,211.88</div>
                <div class="market-change positive">−344.52 (0.41%)</div>
            </div>
            <div class="market-item">
                <div class="market-name">NIFTY 50</div>
                <div class="market-value positive">25,795.15</div>
                <div class="market-change positive">−96.25 (0.37%)</div>
            </div>
            <div class="market-item">
                <div class="market-name">Gold (₹/10g)</div>
                <div class="market-value positive">1,25,280.00 </div>
                <div class="market-change positive">+0.15%</div>
            </div>
            <div class="market-item">
                <div class="market-name">USD/INR</div>
                <div class="market-value positive">₹87.82</div>
                <div class="market-change positive">+0.08%</div>
            </div>
            <div style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: #666;">Live market data</div>
        `;
    }
}

// Handle contact form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In production, send this data to your backend/email service
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Fetch market data on home page
    fetchMarketData();
    
    // Refresh market data every 60 seconds
    setInterval(fetchMarketData, 60000);
    
    // Highlight active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});
