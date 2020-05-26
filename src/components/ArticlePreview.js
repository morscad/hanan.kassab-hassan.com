import React from "react";
import './ArticlePreview.scss'

import tempImage from '../assets/images/tempImage.png'
import {Link} from "react-router-dom";
const ArticlePreview = () => {
    return (
        <section className={"articlePreview"}>
            <div className={'imageContainer'}>
                <img src={tempImage} />
            </div>
            <div className={'title'}>Lorem ipsum dolor sit amet</div>
            <div className={'date'}>May, 21st 2020</div>
            <div className={'excerptContainer'}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor, augue et elementum laoreet, quam erat posuere tortor, luctus finibus lacus lacus eget ex. Phasellus nec pharetra felis, eu dictum sapien. Duis sodales leo at ornare sollicitudin. Vestibulum non leo nisl.</p>
                <Link to={'/article/123'}>Read More</Link>
            </div>
            <dv>

            </dv>
        </section>
    );
}
export default ArticlePreview;
