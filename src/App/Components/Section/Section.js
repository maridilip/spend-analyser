import React from 'react'
import PropTypes from 'prop-types'
// import { Image, Clearfix } from 'react-bootstrap'
// import { getBaseUrl } from '../../utils'

// const sectionMenuImg = getBaseUrl() + 'assets/images/section-menu.PNG'
const Section = ({ header, children, className }) => (<section className={`app-section ${className}`}>
    <div>
        <h3 className={'heading'}>{header}</h3>
        {/* <Image src={sectionMenuImg} alt="menu" responsive className={'section-menu pull-right'} />
        <Clearfix /> */}
    </div>
    <div>{children}</div>
</section>)

Section.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.string
}
export default Section