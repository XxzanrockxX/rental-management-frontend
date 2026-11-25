import { useState } from 'react';

export default function FuelNeedleGauge() {

  const [fuelLevel, setFuelLevel] = useState(0.75);

  const [isDragging, setIsDragging] = useState(false);

  const minAngle = -165;

  const maxAngle = -15;

  const angle = minAngle + fuelLevel * (maxAngle - minAngle);

  const radians = (angle * Math.PI) / 180;

  const needleX = 150 + 105 * Math.cos(radians);

  const needleY = 145 + 105 * Math.sin(radians);

  function updateFuelLevel(clientX, clientY, svg) {

    const rect = svg.getBoundingClientRect();

    const x = ((clientX - rect.left) / rect.width) * 300;

    const y = ((clientY - rect.top) / rect.height) * 190;

    const pointerAngle =

      (Math.atan2(y - 145, x - 150) * 180) / Math.PI;

    const limitedAngle = Math.max(

      minAngle,

      Math.min(maxAngle, pointerAngle)

    );

    setFuelLevel(

      (limitedAngle - minAngle) / (maxAngle - minAngle)

    );

  }

  function startDragging(event) {

    const svg = event.currentTarget.ownerSVGElement;

    if (!svg) return;

    event.preventDefault();

    svg.setPointerCapture(event.pointerId);

    setIsDragging(true);

    updateFuelLevel(event.clientX, event.clientY, svg);

  }

  function handlePointerMove(event) {

    if (!isDragging) return;

    updateFuelLevel(

      event.clientX,

      event.clientY,

      event.currentTarget

    );

  }

  function stopDragging() {

    setIsDragging(false);

  }

  return (

    <div className="fuel-needle-gauge">

      <svg

        className="fuel-needle-gauge__svg"

        viewBox="0 0 300 190"

        role="img"

        aria-label={`Indicador de combustible: ${Math.round(

          fuelLevel * 100

        )}%`}

        onPointerMove={handlePointerMove}

        onPointerUp={stopDragging}

        onPointerCancel={stopDragging}

      >

        {Array.from({ length: 11 }, (_, index) => {

          const tickAngle = (-165 + index * 15) * (Math.PI / 180);

          const outerRadius = 130;

          const innerRadius = index % 5 === 0 ? 108 : 116;

          const x1 = 150 + innerRadius * Math.cos(tickAngle);

          const y1 = 145 + innerRadius * Math.sin(tickAngle);

          const x2 = 150 + outerRadius * Math.cos(tickAngle);

          const y2 = 145 + outerRadius * Math.sin(tickAngle);

          return (

            <line

              key={index}

              x1={x1}

              y1={y1}

              x2={x2}

              y2={y2}

              className="fuel-needle-gauge__tick"

            />

          );

        })}

        <text

          x="18"

          y="170"

          className="fuel-needle-gauge__label"

        >

          E

        </text>

        <text

          x="282"

          y="170"

          textAnchor="end"

          className="fuel-needle-gauge__label"

        >

          F

        </text>

        <g className="fuel-needle-gauge__pump">

          <rect x="136" y="83" width="19" height="38" rx="2" />

          <rect

            x="139"

            y="87"

            width="13"

            height="11"

            fill="white"

          />

          <path

            d="M155 89 L161 94 L161 115 Q161 119 157 119"

            fill="none"

            stroke="currentColor"

            strokeWidth="3"

            strokeLinecap="round"

          />

          <path

            d="M161 95 L164 98"

            fill="none"

            stroke="currentColor"

            strokeWidth="2"

          />

          <rect x="133" y="119" width="25" height="4" rx="1" />

        </g>

        <line

          x1="150"

          y1="145"

          x2={needleX}

          y2={needleY}

          className="fuel-needle-gauge__needle"

        />

        <circle

          cx={needleX}

          cy={needleY}

          r="9"

          className="fuel-needle-gauge__knob"

          onPointerDown={startDragging}

        />

        <circle

          cx="150"

          cy="145"

          r="5"

          className="fuel-needle-gauge__center"

        />

      </svg>

    </div>

  );

}
