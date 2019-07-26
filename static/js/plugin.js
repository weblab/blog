// 愚人节快乐
blog.addLoadEvent(function() {
  var calendar = new Date()
  var month = calendar.getMonth()
  var date = calendar.getDate()
  if (month == 3 && date == 1 && localStorage && !localStorage.cancelFool) {
    console.log('愚人节快乐╰(￣▽￣)╭')
    var style = '-webkit-transform: rotate(-180deg);transform: rotate(-180deg);'
    document.body.style = style
  }
})

// 打印主题标识,请保留出处
blog.addLoadEvent(function() {
  var style1 = 'background:#4BB596;color:#ffffff;border-radius: 2px;'
  var style2 = 'color:#000000;'
  var author = ' TMaize'
  var github = ' https://github.com/TMaize/tmaize-blog'
  var build = ' ' + blog.buildAt
  console.info('%c Theme Author %c' + author, style1, style2)
  console.info('%c Theme GitHub %c' + github, style1, style2)
  console.info('%c Site  Build  %c' + build, style1, style2)
})

// 新建DIV包裹TABLE
blog.addLoadEvent(function() {
  // 文章页生效
  if (document.getElementsByClassName('page-post').length == 0) {
    return
  }
  var tables = document.getElementsByTagName('table')
  for (var i = 0; i < tables.length; i++) {
    var table = tables[i]
    var elem = document.createElement('div')
    elem.setAttribute('class', 'table-container')
    table.parentNode.insertBefore(elem, table)
    elem.appendChild(table)
  }
})

// 菜单
// 回到顶部
blog.addLoadEvent(function() {
  var upDom = document.getElementById('moveUp')
  var bottom = parseInt(window.getComputedStyle(upDom).bottom)
  // 隐藏
  upDom.style.bottom = -2 * bottom + 'px'

  function getScrollTop() {
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    } else if (document.body) {
      return document.body.scrollTop
    }
  }

  blog.addEvent(window, 'scroll', function() {
    // 菜单
    document.querySelector('#menu-checkbox').checked = false
    upDom.style.display = 'block'
    // 回到顶部
    if (getScrollTop() > 200) {
      upDom.style.bottom = bottom + 'px'
    } else {
      upDom.style.bottom = -2 * bottom + 'px'
    }
  })

  blog.addEvent(upDom, 'click', function() {
    if (document.documentElement && document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0
    } else if (document.body) {
      document.body.scrollTop = 0
    }
  })
})

// 文字冒泡-社会主义核心价值观
blog.addLoadEvent(function() {
  if (document.body.offsetWidth <= 560) {
    return false
  }
  var texts = [
    '富强',
    '民主',
    '文明',
    '和谐',
    '自由',
    '平等',
    '公正',
    '法治',
    '爱国',
    '敬业',
    '诚信',
    '友善'
  ]
  var temp = '<span style="top:{top}px;'
  temp += 'left:{left}px;'
  temp += 'font-size: 12px;'
  temp += 'width: 30px;'
  temp += 'z-index: 999;'
  temp += 'position: absolute;'
  temp += 'opacity: 1;'
  temp += 'transition: all 500ms ease-out;'
  temp += '-webkit-transition: all 500ms ease-out;"'
  temp += 'class="select-none"'
  temp += '>{text}</span>'

  blog.addEvent(window, 'click', function(ev) {
    var tagName = ev.target.tagName.toLocaleLowerCase()
    if (tagName == 'a') {
      return
    }
    var text = texts[parseInt(Math.random() * texts.length)]
    var html = temp.replace('{text}', text)
    html = html.replace('{top}', ev.pageY - 10)
    html = html.replace('{left}', ev.pageX - 10)

    var o = document.createElement('div')
    o.innerHTML = html
    var node = o.children[0]

    document.body.appendChild(node)
    o = null
    setTimeout(function() {
      node.style.top = ev.pageY - 50 + 'px'
      node.style.opacity = 0
    }, 20)

    setTimeout(function() {
      document.body.removeChild(node)
      node = null
    }, 500)
  })
})
