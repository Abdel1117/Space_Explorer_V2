import React from 'react';
import ImageHolder from '../../componants/imageHolder/imageHolder';
import NewsLetter from '../../componants/newsLetter/NewsLetter';
import CardNews from '../../componants/cardNews/CardNews';
import TagsArticleList from '../../componants/tagsArticlesList/TagsArticleList';
import Carousel from '../../componants/Carousel/Carousel';

const Home = () => {
    return (
        <section className='w-11/12 md:w-9/12 mx-auto pb-12'>
            <ImageHolder />
            <Carousel />
            <div className='grid md:grid-cols-12 gap-5 mt-10 relative '>
                <CardNews />
                <CardNews />
                <CardNews />
                <CardNews />
                <CardNews />
                <div className='col-span-12 lg:col-span-3 sm:flex lg:flex-col sm:justify-between lg:absolute lg:top-0 lg:-right-12 xl:right-2 2xl:right-18'>
                    <NewsLetter />
                    <TagsArticleList />
                </div>
            </div >
        </section>
    );
}

export default Home;
