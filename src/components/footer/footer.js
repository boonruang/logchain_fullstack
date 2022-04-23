import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>
          <a href="https://www.industry.go.th">© 2565 กระทรวงอุตสาหกรรม</a>.
        </strong>
        <div className="float-right d-none d-sm-inline-block text-right">
          <div>สำนักงานเศรษฐกิจอุตสาหกรรม</div>
          <div>75/6 ถนนพระรามที่ 6 เขตราชเทวี กรุงเทพฯ 10400</div>
          <div>โทร : 024306808 ต่อ 680805 อีเมล : isingleform@oie.go.th</div>
        </div>
      </footer>
    )
  }
}

export default Footer
