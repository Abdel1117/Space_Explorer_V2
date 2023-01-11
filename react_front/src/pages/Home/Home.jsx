import React from 'react';
import BoxGrid from '../../componants/boxGrid/boxGrid';
import ImageHolder from '../../componants/imageHolder/imageHolder';
import NewsLetter from '../../componants/newsLetter/NewsLetter';
import CardNews from '../../componants/cardNews/CardNews';
import TagsArticleList from '../../componants/tagsArticlesList/TagsArticleList';

const Home = () => {
    return (
        <section className='w-11/12 md:w-9/12 mx-auto'>
            <ImageHolder />
            <BoxGrid />

            <div className='grid md:grid-cols-12 gap-5 mt-10 relative'>
                <CardNews />
                <CardNews />

                <CardNews />
                <CardNews />
                <CardNews />

                <div className='col-span-12 lg:col-span-3 sm:flex lg:flex-col sm:justify-between lg:absolute lg:top-0  lg:-right-12 xl:right-2 2xl:right-28'>
                    <NewsLetter />
                    <TagsArticleList />
                </div>
            </div>




        </section>
    );
}

export default Home;
