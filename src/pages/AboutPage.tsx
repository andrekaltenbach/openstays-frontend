import { GithubLogoIcon, LinkedinLogoIcon, LinkIcon } from '@phosphor-icons/react';

export default function AboutPage() {
  return (
    <div className="flex flex-col justify-center md:flex-row gap-10 max-w-200 mx-auto h-full mt-5">
      <div className="mx-auto">
        <div className="card p-4 text-center">
          <h1 className=" mb-2">About OpenStays</h1>
          <p>
            OpenStays is a community-driven platform that connects travelers with generous hosts
            offering free places to stay — whether it's a quiet spot for a tent, space for a
            caravan, or a cozy couch or guest room. <br /> Our goal is to{' '}
            <span className="text-lime-800 font-semibold">
              {' '}
              make travel more accessible, meaningful, and connected{' '}
            </span>{' '}
            by helping people avoid expensive hotels and instead experience the joy of staying with
            locals, discovering new landscapes, and building real human connections. We believe that
            travel should be about{' '}
            <span className="text-lime-800 font-semibold">
              {' '}
              freedom, exploration, and authenticity{' '}
            </span>{' '}
            — not tight budgets and hotel bookings. OpenStays is for those who want to sleep under
            the stars, wake up in a local’s garden, or share stories over breakfast with their host.
            It’s about rediscovering the spirit of hospitality and the natural rhythm of the road.{' '}
            <br />
            This project was developed as part of the Ironhack Web Development Bootcamp, using a
            full modern tech stack: TypeScript, React, Node.js, Express, and PostgreSQL. It’s a
            passion project built not just with code, but with care.When I’m not coding, you’ll
            likely find me playing music or hiking somewhere off the beaten path — two things that
            keep me grounded and inspired. <br /> Thanks for stopping by — and even more for sharing
            a space. <br />{' '}
            <span className="text-lime-800 font-bold text-lg">
              Open the road. Open your door. OpenStays.
            </span>
          </p>
        </div>
        <div className="card pb-4">
          <div className="flex gap-8 my-10 justify-center items-center">
            <img
              src="/andre.jpg"
              alt="portrait André Kaltenbach"
              className="h-40 w-40 rounded-full"
            />
            <div>
              <p className="mt-5">André Kaltenbach</p>
              <div className="flex justify-center gap-2 mt-1">
                <a
                  href="https://github.com/andrekaltenbach"
                  target="_blank"
                  className="hover:text-lime-700 duration-300"
                >
                  <GithubLogoIcon size={32} weight="duotone" />
                </a>
                <a
                  href="https://www.linkedin.com/in/andrekaltenbach/"
                  target="_blank"
                  className="hover:text-lime-700 duration-300"
                >
                  <LinkedinLogoIcon size={32} weight="duotone" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 sm:flex-row pt-5 border-t-2 border-lime-800">
            <p>Project Github repositories:</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/andrekaltenbach/openstays-frontend"
                target="_blank"
                className="text-lime-800"
              >
                <div className="flex">
                  <LinkIcon size={20} weight="light" /> Frontend
                </div>
              </a>
              <a
                href="https://github.com/andrekaltenbach/openstays-backend"
                target="_blank"
                className="text-lime-800"
              >
                <div className="flex">
                  <LinkIcon size={20} weight="light" /> Backend
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
