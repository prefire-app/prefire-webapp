const VENMO_URL = "https://venmo.com/u/Jack-Lesemann"; // TODO: replace with your Venmo username

export default function Donate() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <h1 className="text-4xl font-bold text-[#efefd1] mb-4">
                Support Prefire
            </h1>
            <p className="text-[#efefd1] opacity-80 text-lg max-w-xl mb-2">
                Prefire is a free, grassroots tool built to help everyday
                homeowners protect their property from wildfires — no insurance
                company, no middleman.
            </p>
            <p className="text-[#efefd1] opacity-80 text-lg max-w-xl mb-10">
                If this tool has been useful to you, consider buying us a
                coffee. Every dollar goes toward keeping the servers running and
                expanding to more counties.
            </p>
            <a
                href={VENMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#008CFF] hover:bg-[#0077d6] transition-colors text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg flex items-center gap-3"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-6 h-6 fill-white"
                >
                    <path d="M40.1 6c1.7 2.8 2.5 5.7 2.5 9.3 0 11.6-9.9 26.6-17.9 37.2H8.2L2 9.4l15.1-1.4 3.2 24.7c3-4.9 6.7-12.6 6.7-17.8 0-2.9-.5-4.8-1.3-6.5L40.1 6z" />
                </svg>
                Donate via Venmo
            </a>
            <p className="text-[#efefd1] opacity-40 text-sm mt-6">
                Venmo: @Jack-Lesemann
            </p>
        </div>
    );
}
