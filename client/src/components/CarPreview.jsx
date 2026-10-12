import "../app.css";

const exteriorColors = {
    red: "#C62828",
    blue: "#2563EB",
    black: "#292929",
    white: "#F5F5F5",
    silver: "#A8ADB4",
    gray: "#808080",
    grey: "#808080",
    green: "#27804A",
    yellow: "#F2C230",
    orange: "#E87924",
};

function getCarColor(exterior) {
    if (!exterior) return "#A8ADB4";

    const normalized = exterior.toLowerCase().trim();

    // Use a predefined color when available.
    if (exteriorColors[normalized]) {
        return exteriorColors[normalized];
    }

    // Support other standard CSS color names and hex values.
    if (
        typeof CSS !== "undefined" &&
        CSS.supports("color", exterior)
    ) {
        return exterior;
    }

    return "#A8ADB4";
}

export default function CarPreview({ exterior, interior }) {
    const bodyColor = getCarColor(exterior);
    const isWhite = bodyColor.toLowerCase() === "#f5f5f5";

    return (
        <div className="car-svg-preview">
            <svg
                className="car-svg"
                viewBox="0 0 480 260"
                role="img"
                aria-label={`${exterior || "Default"} exterior car preview`}
            >
                <defs>
                    <linearGradient
                        id="car-body-shine"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Ground shadow */}
                <ellipse
                    cx="240"
                    cy="210"
                    rx="174"
                    ry="17"
                    fill="#000000"
                    opacity="0.12"
                />

                {/* Rear spoiler */}
                <path
                    d="M91 145 L72 135 L75 128 L111 132 L120 143 Z"
                    fill="#343434"
                />

                {/* Main car body */}
                <path
                    d="
                        M64 169
                        L73 145
                        Q77 135 95 131
                        L139 121
                        L174 82
                        Q185 69 205 69
                        L294 69
                        Q313 70 329 89
                        L362 126
                        L398 137
                        Q414 143 418 159
                        L420 178
                        Q420 190 405 192
                        L76 192
                        Q61 190 64 169 Z
                    "
                    fill={bodyColor}
                    stroke={isWhite ? "#777777" : "#222222"}
                    strokeWidth="2"
                />

                {/* Body shine and shading */}
                <path
                    d="
                        M64 169
                        L73 145
                        Q77 135 95 131
                        L139 121
                        L174 82
                        Q185 69 205 69
                        L294 69
                        Q313 70 329 89
                        L362 126
                        L398 137
                        Q414 143 418 159
                        L420 178
                        Q420 190 405 192
                        L76 192
                        Q61 190 64 169 Z
                    "
                    fill="url(#car-body-shine)"
                />

                {/* Windows */}
                <path
                    d="
                        M151 119
                        L183 84
                        Q190 77 204 77
                        L238 77
                        L238 119 Z
                    "
                    fill="#263746"
                    stroke="#555555"
                    strokeWidth="2"
                />

                <path
                    d="
                        M247 77
                        L292 77
                        Q306 78 317 93
                        L340 119
                        L247 119 Z
                    "
                    fill="#263746"
                    stroke="#555555"
                    strokeWidth="2"
                />

                {/* Window reflections */}
                <path
                    d="M185 85 L202 80 L202 108"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    opacity="0.35"
                />

                <path
                    d="M258 82 L290 82"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    opacity="0.3"
                />

                {/* Window divider */}
                <path
                    d="M242 76 L242 126"
                    fill="none"
                    stroke="#333333"
                    strokeWidth="4"
                />

                {/* Door lines */}
                <path
                    d="M244 127 L244 180 M326 128 L342 178"
                    fill="none"
                    stroke="#333333"
                    strokeWidth="1.5"
                    opacity="0.65"
                />

                {/* Door handles */}
                <rect
                    x="270"
                    y="137"
                    width="23"
                    height="4"
                    rx="2"
                    fill={isWhite ? "#555555" : "#333333"}
                />

                <rect
                    x="304"
                    y="137"
                    width="16"
                    height="4"
                    rx="2"
                    fill={isWhite ? "#555555" : "#333333"}
                />

                {/* Front headlight */}
                <path
                    d="M379 142 L405 151 L410 162 L379 158 Z"
                    fill="#FFF4CC"
                    stroke="#777777"
                    strokeWidth="1.5"
                />

                {/* Rear light */}
                <path
                    d="M73 146 L91 139 L86 154 L69 160 Z"
                    fill="#D62828"
                />

                {/* Front grille */}
                <path
                    d="M388 170 L412 170 L409 181 L385 181 Z"
                    fill="#292929"
                />

                <path
                    d="M391 173 L408 173 M389 177 L407 177"
                    stroke="#777777"
                    strokeWidth="1.5"
                />

                {/* Wheels */}
                {[151, 354].map((x) => (
                    <g key={x}>
                        <circle
                            cx={x}
                            cy="187"
                            r="29"
                            fill="#242424"
                            stroke="#111111"
                            strokeWidth="3"
                        />

                        <circle
                            cx={x}
                            cy="187"
                            r="18"
                            fill="#BFC3C8"
                            stroke="#666666"
                            strokeWidth="2"
                        />

                        <circle
                            cx={x}
                            cy="187"
                            r="7"
                            fill="#505050"
                        />

                        {[0, 72, 144, 216, 288].map((angle) => (
                            <path
                                key={angle}
                                d="M151 174 L151 181"
                                transform={`translate(${x - 151} 0) rotate(${angle} ${x} 187)`}
                                stroke="#666666"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        ))}
                    </g>
                ))}

                {/* Front bumper highlight */}
                <path
                    d="M365 188 L402 188"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    opacity="0.45"
                />

                {/* Interior selection indicator */}
                {interior && (
                    <text
                        x="240"
                        y="238"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#666666"
                    >
                        {`Interior: ${interior}`}
                    </text>
                )}
            </svg>

            <div className="car-svg-caption">
                <span
                    className="car-color-swatch"
                    style={{ backgroundColor: bodyColor }}
                />
                <span>
                    {exterior
                        ? exterior.charAt(0).toUpperCase() + exterior.slice(1)
                        : "Default"}{" "}
                    Exterior
                </span>
            </div>
        </div>
    );
}
