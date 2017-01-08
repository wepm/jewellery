//index.js
Page({
  data: {
    imgUrls: [
      'https://gdp.alicdn.com/imgextra/i1/407700539/TB23I1vabBkpuFjy1zkXXbSpFXa-407700539.jpg',
      'https://gdp.alicdn.com/imgextra/i1/407700539/TB2.bMjXQ1M.eBjSZFOXXc0rFXa-407700539.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },



  
})
