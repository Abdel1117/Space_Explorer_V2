import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCheck, HiPlay, HiOutlineArrowRight } from 'react-icons/hi2'
import videoPoster from '../../assets/images/astronaute-.jpg'

/* Inclinaison du plan orbital. Doit rester identique à la keyframe "orbit-counter" de tailwind.config.cjs */
const TILT = 62

/* Tailles des orbites en % du plan, durées compressées pour garder un mouvement lisible */
const PLANETS = [
    { name: 'Mercure', orbit: 22, size: 5, color: '#b8b2ac', duration: 6, start: 40 },
    { name: 'Vénus', orbit: 32, size: 8, color: '#e9c48a', duration: 10, start: 200 },
    { name: 'Terre', orbit: 42, size: 8, color: '#4f8df5', duration: 14, start: 300 },
    { name: 'Mars', orbit: 52, size: 6, color: '#e0703f', duration: 20, start: 120 },
    { name: 'Jupiter', orbit: 66, size: 16, color: '#d9a46e', duration: 36, start: 250 },
    { name: 'Saturne', orbit: 80, size: 13, color: '#e8d29c', duration: 52, start: 20, ring: true },
    { name: 'Uranus', orbit: 90, size: 10, color: '#8fd8f2', duration: 70, start: 160 },
    { name: 'Neptune', orbit: 100, size: 10, color: '#6b6ff0', duration: 90, start: 280 },
]

const STARS = [
    [8, 12], [22, 70], [35, 18], [48, 88], [57, 8], [66, 52], [78, 22], [88, 74], [93, 40], [14, 45], [72, 92], [40, 60],
]
const starField = STARS
    .map(([x, y], i) => `radial-gradient(${i % 3 === 0 ? 1.5 : 1}px ${i % 3 === 0 ? 1.5 : 1}px at ${x}% ${y}%, rgba(255,255,255,${i % 2 ? 0.55 : 0.85}), transparent)`)
    .join(', ')

const CHAT_PREVIEW = [
    { author: 'Léa', initial: 'L', color: 'bg-sky-500', text: "Quelqu'un suit le lancement ce soir ?" },
    { author: 'Karim', initial: 'K', color: 'bg-amber-500', text: 'Oui, je suis devant le direct depuis 20 minutes !' },
    { author: 'Vous', own: true, text: "Je vous rejoins après avoir observé Jupiter." },
]

function SolarSystem() {
    return (
        <div aria-hidden='true' className='relative h-44 sm:h-60 md:h-80 lg:h-96 [perspective:1000px]'>
            <div
                className='absolute left-1/2 top-1/2 w-[min(100%,34rem)] aspect-square [transform-style:preserve-3d]'
                style={{ transform: `translate(-50%, -50%) rotateX(${TILT}deg)` }}
            >
                {/* Soleil */}
                <div
                    className='absolute left-1/2 top-1/2 w-[12%] aspect-square -ml-[6%] -mt-[6%]'
                    style={{ transform: `rotateX(-${TILT}deg)` }}
                >
                    <div className='absolute -inset-[120%] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.32),transparent_65%)]' />
                    <div className='relative w-full h-full rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff6c4,#fbbf24_45%,#f97316)]' />
                </div>

                {PLANETS.map((planet) => {
                    const inset = `${(100 - planet.orbit) / 2}%`
                    const phase = {
                        animationDuration: `${planet.duration}s`,
                        animationDelay: `-${(planet.start / 360) * planet.duration}s`,
                    }
                    return (
                        <div
                            key={planet.name}
                            className='absolute rounded-full border-[1.5px] border-white/20 [transform-style:preserve-3d] motion-safe:animate-orbit'
                            style={{ inset, transform: `rotate(${planet.start}deg)`, ...phase }}
                        >
                            <div
                                className='absolute left-1/2 top-0 rounded-full motion-safe:animate-orbit-counter'
                                style={{
                                    width: planet.size,
                                    height: planet.size,
                                    marginLeft: -planet.size / 2,
                                    marginTop: -planet.size / 2,
                                    background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.55), ${planet.color} 45%, rgba(0,0,0,0.55) 120%)`,
                                    transform: `rotate(-${planet.start}deg) rotateX(-${TILT}deg)`,
                                    ...phase,
                                }}
                            >
                                {planet.ring &&
                                    <span className='absolute -inset-[45%] rounded-full border-[1.5px] border-[#e8d29c]/70 [transform:rotate(-20deg)_scaleY(0.32)]' />
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Avenir = () => {
    const navigate = useNavigate()

    return (
        <section className='w-11/12 md:w-9/12 mx-auto pt-8 md:pt-12 pb-16'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | À venir</title>
                <meta name="description" content="Les prochaines nouveautés de Space Explorer : un Système solaire à explorer en 3D, une page vidéo et un chat en direct." />
            </Helmet>

            <header className='mb-8 md:mb-10 max-w-3xl'>
                <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white [text-wrap:balance]'>
                    Ce qui arrive sur Space Explorer
                </h1>
                <p className='mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300'>
                    Trois nouveautés sont en préparation : un Système solaire à explorer en 3D, une page dédiée aux vidéos et un chat pour échanger en direct avec la communauté.
                </p>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5'>

                {/* Système solaire 3D */}
                <article
                    className='md:col-span-2 lg:col-span-7 lg:row-span-2 flex flex-col rounded-xl overflow-hidden shadow-md bg-[#0d0c22] p-6 md:p-8'
                    style={{ backgroundImage: `${starField}, radial-gradient(120% 80% at 50% 100%, rgba(124,58,237,0.28), transparent 70%)` }}
                >
                    <h2 className='text-xl md:text-3xl font-bold tracking-tight text-white'>
                        Le Système solaire en 3D
                    </h2>
                    <p className='mt-3 max-w-xl text-sm md:text-base text-indigo-100/80'>
                        Faites tourner les planètes, zoomez sur chacune d'elles et suivez leurs orbites autour du Soleil, directement dans votre navigateur.
                    </p>
                    <div className='flex-1 flex items-center my-6'>
                        <div className='w-full'>
                            <SolarSystem />
                        </div>
                    </div>
                    <ul className='grid gap-2 sm:grid-cols-3 text-sm text-indigo-50'>
                        {['Les 8 planètes', 'Une fiche par astre', 'Le temps en accéléré'].map((item) => (
                            <li key={item} className='flex items-center gap-2'>
                                <HiOutlineCheck className='shrink-0 text-violet-300' aria-hidden='true' />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>

                {/* Page vidéo */}
                <article className='relative lg:col-span-5 min-h-[300px] rounded-xl overflow-hidden shadow-md bg-[#0d0c22]'>
                    <img
                        src={videoPoster}
                        alt=''
                        loading='lazy'
                        className='absolute inset-0 w-full h-full object-cover object-[60%_center]'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10' />
                    <div aria-hidden='true' className='absolute right-5 top-5 grid place-items-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm text-white ring-1 ring-white/30'>
                        <HiPlay className='w-5 h-5 ml-0.5' />
                    </div>
                    <div className='relative h-full flex flex-col justify-end p-6 md:p-8'>
                        <h2 className='text-xl md:text-2xl font-bold tracking-tight text-white'>
                            Une page vidéo
                        </h2>
                        <p className='mt-2 text-sm md:text-base text-gray-200'>
                            Documentaires, lancements de fusées et explications en images, réunis au même endroit et classés par thème comme les articles.
                        </p>
                    </div>
                </article>

                {/* Chat en direct */}
                <article className='lg:col-span-5 rounded-xl shadow-md bg-white dark:bg-[#1a1a2e] p-6 md:p-8'>
                    <h2 className='text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        Un chat en direct
                    </h2>
                    <p className='mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300'>
                        Échangez en temps réel avec les autres passionnés pendant une éclipse, un lancement ou une nuit d'observation.
                    </p>

                    <div aria-hidden='true' className='mt-5 flex flex-col gap-3 text-sm'>
                        {CHAT_PREVIEW.map((message) => message.own ?
                            <p key={message.text} className='self-end max-w-[80%] rounded-2xl rounded-br-md bg-violet-600 text-white px-3.5 py-2'>
                                {message.text}
                            </p>
                            :
                            <div key={message.text} className='flex items-end gap-2 max-w-[85%]'>
                                <span className={`shrink-0 grid place-items-center w-7 h-7 rounded-full text-xs font-semibold text-white ${message.color}`}>
                                    {message.initial}
                                </span>
                                <div className='rounded-2xl rounded-bl-md bg-gray-100 dark:bg-white/10 px-3.5 py-2'>
                                    <span className='block text-xs font-semibold text-gray-600 dark:text-gray-400'>{message.author}</span>
                                    <span className='text-gray-800 dark:text-gray-100'>{message.text}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className='mt-4 text-xs text-gray-500 dark:text-gray-400'>Aperçu de l'interface</p>
                </article>
            </div>

            <div className='mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <p className='text-base md:text-lg text-gray-700 dark:text-gray-200'>
                    Une fonctionnalité que vous aimeriez voir ? Proposez-la sur le forum.
                </p>
                <button
                    onClick={() => navigate('/forum')}
                    className='self-start md:self-auto shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2.5 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 dark:focus-visible:ring-violet-800'
                >
                    Aller au forum
                    <HiOutlineArrowRight aria-hidden='true' />
                </button>
            </div>
        </section>
    )
}

export default Avenir
