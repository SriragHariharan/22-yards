import React from 'react'

const STEPS = [
  { key: 'order placed', label: 'Placed', icon: 'fa-clipboard-check' },
  { key: 'order confirmed', label: 'Confirmed', icon: 'fa-check-circle' },
  { key: 'order packed', label: 'Packed', icon: 'fa-box' },
  { key: 'order shipped', label: 'Shipped', icon: 'fa-truck' },
  { key: 'order delivered', label: 'Delivered', icon: 'fa-home' },
]

const STATUS_ORDER = ['order placed', 'order confirmed', 'order packed', 'order shipped', 'order delivered']

export default function OrderTimeline({ activeStatus }) {
  const activeIndex = STATUS_ORDER.indexOf(activeStatus)

  return (
    <div className="buyer-order-timeline" role="list" aria-label="Order progress">
      {STEPS.map((step, index) => {
        const isActive = index === activeIndex
        const isDone = index < activeIndex
        const stepClass = isActive
          ? 'buyer-order-timeline__step--active'
          : isDone
            ? 'buyer-order-timeline__step--done'
            : ''

        return (
          <div key={step.key} className={`buyer-order-timeline__step ${stepClass}`} role="listitem">
            <span className="buyer-order-timeline__icon" aria-hidden="true">
              <i className={`fas ${step.icon}`} />
            </span>
            <span className="buyer-order-timeline__label">{step.label}</span>
          </div>
        )
      })}
    </div>
  )
}
