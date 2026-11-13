"use client"

import React, { createContext, useContext } from "react"
import styles from "./Ui.module.scss"

type ChildrenProps = React.PropsWithChildren<{
  className?: string
  style?: React.CSSProperties
}>

type ColumnProps = ChildrenProps & {
  xs?: number
  sm?: number
  md?: number
  lg?: number
}

type DropdownContextValue = {
  isOpen: boolean
  toggle: () => void
}

const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  toggle: () => undefined,
})

export function Container({ children, className, ...props }: ChildrenProps) {
  return (
    <div className={`${styles.container} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function Row({ children, className, ...props }: ChildrenProps) {
  return (
    <div className={`${styles.row} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function Col({
  children,
  className,
  xs,
  sm,
  md,
  lg,
  ...props
}: ColumnProps) {
  return (
    <div
      className={`${styles.column} ${className ?? ""}`}
      style={
        {
          ...props.style,
          "--col-xs": xs ? `${(xs / 12) * 100}%` : undefined,
          "--col-sm": sm ? `${(sm / 12) * 100}%` : undefined,
          "--col-md": md ? `${(md / 12) * 100}%` : undefined,
          "--col-lg": lg ? `${(lg / 12) * 100}%` : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

type AlertProps = ChildrenProps & {
  color?: string
  isOpen?: boolean
  toggle?: () => void
}

export function Alert({
  children,
  className,
  color = "info",
  isOpen = true,
  toggle,
  ...props
}: AlertProps) {
  if (!isOpen) return null

  return (
    <div
      className={`${styles.alert} ${styles[`alert${color}`] ?? ""} ${
        className ?? ""
      }`}
      role="alert"
      {...props}
    >
      {children}
      {toggle && (
        <button
          type="button"
          className={styles.alertClose}
          aria-label="Close"
          onClick={toggle}
        >
          ×
        </button>
      )}
    </div>
  )
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string
  outline?: boolean
  primary?: boolean
}

export function Button({
  children,
  className,
  color = "secondary",
  outline = false,
  primary = false,
  type = "button",
  ...props
}: ButtonProps) {
  const variant = primary ? "primary" : color
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button${variant}`] ?? ""} ${
        outline ? styles.outline : ""
      } ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({ children, className, ...props }: ChildrenProps) {
  return (
    <section className={`${styles.card} ${className ?? ""}`} {...props}>
      {children}
    </section>
  )
}

export function CardBody({ children, className, ...props }: ChildrenProps) {
  return (
    <div className={`${styles.cardBody} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: ChildrenProps) {
  return (
    <div className={`${styles.cardHeader} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: ChildrenProps) {
  return (
    <h3 className={`${styles.cardTitle} ${className ?? ""}`} {...props}>
      {children}
    </h3>
  )
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${className ?? ""}`}
      {...props}
    />
  )
})

export function InputGroup({ children, className, ...props }: ChildrenProps) {
  return (
    <div className={`${styles.inputGroup} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function InputGroupAddon({
  children,
  className,
  ...props
}: ChildrenProps) {
  return (
    <div className={`${styles.inputAddon} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

export function InputGroupText({
  children,
  className,
  ...props
}: ChildrenProps) {
  return (
    <span className={`${styles.inputGroupText} ${className ?? ""}`} {...props}>
      {children}
    </span>
  )
}

type DropdownProps = ChildrenProps & {
  isOpen?: boolean
  toggle?: () => void
}

export function InputGroupButtonDropdown({
  children,
  className,
  isOpen = false,
  toggle = () => undefined,
  ...props
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={`${styles.dropdown} ${className ?? ""}`} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

type DropdownToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  caret?: boolean
}

export function DropdownToggle({
  children,
  className,
  caret = false,
  onClick,
  ...props
}: DropdownToggleProps) {
  const dropdown = useContext(DropdownContext)
  return (
    <button
      type="button"
      className={`${styles.dropdownToggle} ${className ?? ""}`}
      aria-expanded={dropdown.isOpen}
      onClick={(event) => {
        dropdown.toggle()
        onClick?.(event)
      }}
      {...props}
    >
      {children}
      {caret && <span className={styles.caret} aria-hidden="true" />}
    </button>
  )
}

type DropdownMenuProps = ChildrenProps

export function DropdownMenu({
  children,
  className,
  ...props
}: DropdownMenuProps) {
  const { isOpen } = useContext(DropdownContext)
  return isOpen ? (
    <div className={`${styles.dropdownMenu} ${className ?? ""}`} {...props}>
      {children}
    </div>
  ) : null
}

type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  divider?: boolean
}

export function DropdownItem({
  children,
  className,
  divider = false,
  ...props
}: DropdownItemProps) {
  if (divider) return <hr className={styles.dropdownDivider} />
  return (
    <button
      type="button"
      className={`${styles.dropdownItem} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

type FormGroupProps = ChildrenProps

export function FormGroup({ children, className, ...props }: FormGroupProps) {
  return (
    <div className={`${styles.formGroup} ${className ?? ""}`} {...props}>
      {children}
    </div>
  )
}

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  for?: string
}

export function Label({
  children,
  className,
  htmlFor,
  for: target,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor ?? target}
      className={`${styles.label} ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  )
}
