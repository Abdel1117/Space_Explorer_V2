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

                <div className=' md:col-span-3 flex flex-col md:absolute md:top-0 md:-right-14'>
                    <NewsLetter />
                    <TagsArticleList />
                </div>               
            </div>

        


        </section>
    );
}

export default Home;
