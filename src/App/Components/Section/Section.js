import React from 'react'
import PropTypes from 'prop-types'
import { Clearfix } from 'react-bootstrap'
// import { getBaseUrl } from '../../utils'

// const sectionMenuImg = getBaseUrl() + 'assets/images/section-menu.PNG'
const Section = ({ header, subHeader: SubTitleComponent, children, className }) => (<section className={`app-section ${className}`}>
    <div>
        <div className={"section-content"}><h3 className={'heading'}>{header}</h3></div>
        {/* <Image src={sectionMenuImg} alt="menu" responsive className={'section-menu pull-right'} />
        <Clearfix /> */}
        <div className={"section-content sub-title"}>{SubTitleComponent ? <SubTitleComponent /> : null}</div>
        <Clearfix />
    </div>
    <div>{children}</div>
</section>)

Section.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.string
}
export default Section